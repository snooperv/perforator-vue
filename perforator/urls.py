from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt

from . import views
from . import raw_peers_views
from . import raw_reviews_views
from . import raw_hierarchy_views
from . import general_views
from . import one_to_one_views


urlpatterns = [
    path('', views.SelfReviewByUserView.as_view(), name='index'),
    path('irate/', views.I_Rate.as_view(), name='irate'),
    path('1to1/', views.OneToOne.as_view(), name='1to1'),
    path('imanager/', views.I_Manager.as_view(), name='imanager'),
    path('registration/', csrf_exempt(views.registration), name='registration'),
    #path('process_rate/', csrf_exempt(views.process_rate_form), name='process_rate'), #Сказали, что работает
    path('process_rate/', general_views.save_process_rate), #Переписано
    path('process_one_to_one/', views.process_one_to_one_form), # Я хз что это
    path('imanager/employee/', views.Employee.as_view(), name='employee'), #не трогал
    path('imanager/employee/rating', raw_peers_views.get_user_rating_by_id),

    #path('peers/demo', raw_peers_views.peers_demo),
    path('peers/all/', raw_peers_views.get_all_peers), #Какая то хуйня - переделать!
    path('peers/my/', raw_peers_views.get_all_current_user_peers),
    path('peers/delete/', raw_peers_views.delete_peers),
    path('peers/save/', raw_peers_views.save_peers),
    path('peers/id', raw_peers_views.get_where_user_id_is_peer),
    path('peers/uid', raw_peers_views.get_user_peers),
    path('peers/delete/user', raw_peers_views.delete_user_peers),
    path('peers/save/user', raw_peers_views.save_user_peers),


    path('self-review/', raw_reviews_views.get_self_review),
    path('self-review/id', raw_reviews_views.get_self_review_by_id),  #!
    path('self-review/main', raw_reviews_views.self_review), #!
    path('self-review/save/', raw_reviews_views.edit_self_review),
    path('review/form/', raw_reviews_views.get_empty_review_form),
    path('review/save/', raw_reviews_views.save_review),
    path('review/get/', raw_reviews_views.get_review),
    path('self-review/is-draft/', raw_reviews_views.get_is_draft_status),

    path('manager', raw_hierarchy_views.get_profile_manager),
    path('team', raw_hierarchy_views.get_profile_team),
    path('hierarchy', raw_hierarchy_views.get_full_hierarchy_tree),

    path('peers/approve', raw_peers_views.approve_user),

    path('api/login', general_views.login_token),
    path('api/refresh-token', general_views.refresh_token),
    path('api/myprofile', general_views.my_profile),
    path('rate_list', general_views.get_irate_list),

    path('1to1/get_common_notes/', one_to_one_views.get_common_notes),
    path('1to1/update_common_notes/', one_to_one_views.update_common_notes),
    path('1to1/get_private_notes/', one_to_one_views.get_private_notes),
    path('1to1/update_private_notes/', one_to_one_views.update_private_notes),
]
