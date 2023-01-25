from django.conf import settings
from .token import tokenCheck
from .models import Profile, User, Review, PrList, Grade, PerformanceReview, Tokens, PeerReviews
from .ratings import peer_review_to_dict


"""
    Модуль для работы с ревью и селф-ревью.
    Аналогичен модулю peers.py
"""


def __format_review_data(review):
    result = {
        'id': review.id,
        'is_draft': review.is_draft,
        'grades': []
    }
    grades = Grade.objects.filter(review=review.id)
    for grade in grades:
        result['grades'].append({
            'id': grade.id,
            'grade_category_id': grade.grade_category.id,
            'grade_category_name': grade.grade_category.name,
            'grade_category_description': grade.grade_category.description,
            'grade_category_preview_description': grade.grade_category.preview_description,
            'comment': grade.comment,
        })
    return result


def get_self_review(request):
    """
    TESTED
        Возвращает селф-ревью
        request.GET: параметры не нужны
        :return: Один из следующих словраей:
        { 'id': review.id, 'is_draft': review.is_draft,
        'grades':   [
            { 'id': grade.id, 'grade_category_id': grade.grade_category.id,
            'grade_category_name': grade.grade_category.name, 'grade_category_description': grade.grade_category.description,
            'comment': grade.comment (только коммент. У сэлф-ревью оценка всегда NULL),
            } {...}, {...}
        ] },
        При ошибке: {'error': True, 'message': 'Профиль с таким id не найден'}
    """
    if tokenCheck(request.headers['token']):
        token = Tokens.objects.filter(token_f=request.headers['token']).first()
        user = token.user
        profile = Profile.objects.filter(user=user)[0]

        review = Review.objects.filter(
            appraising_person=profile.id,
            evaluated_person=profile.id,
            pr_id=profile.pr).first()
        if not review:
            performance_review = PerformanceReview.objects.get(id=1)
            review = Review.objects.create(appraising_person=profile,
                                           evaluated_person=profile,
                                           performance_review=performance_review,
                                           is_draft=True,
                                           pr_id=profile.pr)
            for grade_category in performance_review.self_review_categories.all():
                Grade.objects.create(
                    review=review,
                    grade_category=grade_category,
                    grade=None,
                    comment=''
                )
    else:
        return {'message': 'Вы не авторизовались'}
    return __format_review_data(review)


def edit_self_review(request):
    """
    TESTED
        Изменяет селф-ревью
        Аналогичен изменению обыкновенного ревью, вынесем функционал в другое место
        request.data: (Заполненное селф-ревью)
        { 'id': review.id, 'is_draft': review.is_draft,
        'grades':   [
            {
            'grade_category_id': grade.grade_category.id,
            'comment': grade.comment (только коммент. У сэлф-ревью оценка всегда NULL),
            }, {...}, {...}
        ] }
        :return: Один из следующих словраей:
        { message: "ОК" },
        При ошибке: {'error': True, 'message': 'Профиль с таким id не найден'}
    """
    if tokenCheck(request.headers['token']):
        token = Tokens.objects.filter(token_f=request.headers['token']).first()
        user = token.user
        profile = Profile.objects.filter(user=user)[0]
        review = Review.objects.get(
            appraising_person=profile.id,
            evaluated_person=profile.id,
            pr_id=profile.pr)
        if review:
            for grade in request.data['grades']:
                Grade.objects.filter(review=review, grade_category_id=grade['grade_category_id']) \
                    .update(grade=None, comment=grade['comment'])
            if not request.data['is_draft']:
                review.is_draft = False
            review.save()
        else:
            return {'status': 'Self-review не найдено'}
    else:
        return {'message': 'Вы не авторизовались'}
    return {'message': 'ОК'}


def is_draft(request, id):
    result = {'status': 'not ok'}
    if tokenCheck(request.headers['token']):
        user = User.objects.filter(id=id).first()
        profile = Profile.objects.filter(user=user)[0]
        review = Review.objects.get(
            appraising_person=profile.id,
            evaluated_person=profile.id,
            pr_id=profile.pr)
        if review:
            result['is_draft'] = review.is_draft
        else:
            result['status'] = 'ok'
    else:
        return {'message': 'Вы не авторизовались'}
    return result


def get_empty_review_form(request):
    """
    TESTED
        Возвращает запрошенный набор тем для построения формы ревью
        Так как у обыкновенных ревью черновиков нет, возвращать готовые ревью не придётся
        Список не оценённых менеджеров \ пиров \ подчинённых запрашивается отедльно
        request.GET: параметры не нужны
        :return: Один из следующих словраей:
        { categories:
            manager_review_categories: [
                { id, name, description },
                {...}, {...}
            ],
            peers_review_categories: [ {...}, {...}],
            team_review_categories: [ {...}, {...}],
         },
        При ошибке: {'error': True, 'message': 'Профиль с таким id не найден'}
    """
    performance_review = PerformanceReview.objects.get(id=1)
    categories = {}
    for role in ['manager', 'peers', 'team']:
        categories_name = role + '_review_categories'
        categories[categories_name] = getattr(performance_review, categories_name).values('id', 'name', 'description')
    return categories


def save_review(request):
    """
        Сохраняет ревью на выбранного пользователя
        Сохранять можно только в чистовик, то есть возвращать его больше не придётся
        request.data: (Заполненное ревью. Аналогично селф-ревью, но:
        все оценки имеют числовой эквивалент;
        is_draft автоматически ставится false;
        есть возможность поставить not_enough_data (если пользователь не может оценить человека))
        { 'id': review.id,
        'evaluated_person': review.evaluated_person_id,
        'is_not_enough_data': boolean
        'grades':   [
            { 'id': grade.id, 'grade_category_id': grade.grade_category.id,
            'grade': grade.grade,
            'comment': grade.comment,
            }, {...}, {...}
        ] }
        :return: Один из следующих словраей:
        { message: "ОК" },
        При ошибке: {'error': True, 'message': 'Профиль с таким id не найден'}
    """
    if tokenCheck(request.headers['token']):
        token = Tokens.objects.filter(token_f=request.headers['token']).first()
        user = token.user
        profile = Profile.objects.filter(user=user)[0]
        review = Review.objects.create(appraising_person=profile,
                                       evaluated_person_id=int(request.data['evaluated_person_id']),
                                       performance_review_id=1,
                                       is_draft=False)
        if not request.data['is_not_enough_data']:
            for grade in request.data['grades']:
                Grade.objects.create(review=review,
                                     grade_category_id=grade['grade_category_id'],
                                     grade=grade['grade'],
                                     comment=grade['comment']
                                     )
        else:
            review.is_not_enough_data = True
        review.save()
    else:
        return {'message': 'Вы не авторизовались'}
    return {'message': 'ОК'}


def get_self_review_by_id(request, id):
    """
    TESTED
        Возвращает селф-ревью
        request.GET: параметры не нужны
        :return: Один из следующих словраей:
        { 'id': review.id, 'is_draft': review.is_draft,
        'grades':   [
            { 'id': grade.id, 'grade_category_id': grade.grade_category.id,
            'grade_category_name': grade.grade_category.name, 'grade_category_description': grade.grade_category.description,
            'comment': grade.comment (только коммент. У сэлф-ревью оценка всегда NULL),
            } {...}, {...}
        ] },
        При ошибке: {'error': True, 'message': 'Профиль с таким id не найден'}
    """
    if tokenCheck(request.headers['token']):
        review = Review.objects.filter(
            appraising_person=id,
            evaluated_person=id).first()
        if not review:
            return {'status': 'Self-review не найдено'}
    else:
        return {'status': 'Вы не авторизовались'}
    return __format_review_data(review)


def get_review(request):
    """
        Возвращает ревью
        :return: Один из следующих словраей:
        { 'id': review.id, 'is_draft': review.is_draft,
        'grades':   [
            { 'id': grade.id, 'grade_category_id': grade.grade_category.id,
            'grade_category_name': grade.grade_category.name, 'grade_category_description': grade.grade_category.description,
            'comment': grade.comment (только коммент. У сэлф-ревью оценка всегда NULL),
            } {...}, {...}
        ] },
        При ошибке: {'error': True, 'message': 'Профиль с таким id не найден'}
    """
    if tokenCheck(request.headers['token']):
        data = request.data
        token = Tokens.objects.filter(token_f=request.headers['token']).first()
        user = token.user
        profile = Profile.objects.filter(user=user)[0]
        if profile.pr == -1:
            return {'status': 'Отсутствуют активные performance review'}
        else:
            pr_id = PrList.objects.filter(id=profile.pr)[0].pr.id
        review = PeerReviews.objects.filter(
            peer_id=data['appraising_person'],
            rated_person=data['evaluated_person'],
            pr_id=pr_id).first()
        if not review:
            return {'status': 'Self-review не найдено'}
    else:
        return {'status': 'Вы не авторизовались'}
    return peer_review_to_dict(review)