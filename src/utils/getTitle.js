export default (form) => {
    const titles = {
        kinder: 'Kinder ',
        grade_one: 'Grade 1 ',
        grade_two: 'Grade 2 ',
        grade_three: 'Grade 3 ',
        grade_four: 'Grade 4 ',
        grade_five: 'Grade 5 ',
        grade_six: 'Grade 6 ',
        grade_seven: 'Grade 7 ',
        grade_eight: 'Grade 8 ',
        grade_nine: 'Grade 9 ',
        grade_ten: 'Grade 10 ',
        grade_eleven: 'Grade 11 ',
        grade_twelve: 'Grade 12 ',
        first_year: 'First Year ',
        second_year: 'Second Year ',
        third_year: 'Third Year ',
        fourth_year: 'Fourth Year ',
        routine_interview: 'Routine Interview ',
        careertracking: 'Career Tracking ',
        conferenceform: 'Conference',
    };

    return titles[form] || 'New Form';
};