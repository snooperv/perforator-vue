const colorGrade = (grade) => {
  if (grade < 2) return "bad";
  if (grade >= 3) return "great";
  return "good";
};

export default colorGrade;