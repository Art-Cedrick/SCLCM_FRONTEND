const INDUSTRY_CRITERIA = {
    BUSINESS_PROCESS_OUTSOURCING: {
        required: ["ENGLISH", "FILIPINO", "FOREIGN_LANGUAGE"],  // above average grade
        preferred: ["COMPUTER", "TLE"],  // average
        optional: ["ARALING_PANLIPUNAN", "MATH", "SCIENCE", "MAPEH"], // low
    },
    AGRICULTURE: {
        required: ["ARALING_PANLIPUNAN"],
        preferred: ["MATH", "SCIENCE", "TLE"],
        optional: ["ENGLISH", "FILIPINO", "COMPUTER", "MAPEH", "FOREIGN_LANGUAGE"],
    },
    HEALTHCARE: {
        required: ["SCIENCE"],
        preferred: ["MATH", "TLE", "FOREIGN_LANGUAGE"],
        optional: ["ENGLISH", "FILIPINO", "MAPEH", "ARALING_PANLIPUNAN", "COMPUTER"],
    },
    MANUFACTURING: {
        required: ["TLE"],
        preferred: ["MATH", "SCIENCE", "COMPUTER", "MAPEH"],
        optional: ["ENGLISH", "FILIPINO", "FOREIGN_LANGUAGE", "ARALING_PANLIPUNAN"],
    },
    CONSTRUCTION: {
        required: ["MATH", "TLE"],
        preferred: ["SCIENCE", "COMPUTER"],
        optional: ["ENGLISH", "FILIPINO", "FOREIGN_LANGUAGE", "MAPEH", "ARALING_PANLIPUNAN"],
    },
    FINANCIAL_SERVICES: {
        required: ["MATH", "ENGLISH"],
        preferred: ["COMPUTER", "ARALING_PANLIPUNAN"],
        optional: ["SCIENCE", "FILIPINO", "TLE", "MAPEH", "FOREIGN_LANGUAGE"],
    },
    TECHNOLOGY: {
        required: ["COMPUTER", "SCIENCE", "ENGLISH"],
        preferred: ["MATH", "TLE"],
        optional: ["FILIPINO", "FOREIGN_LANGUAGE", "MAPEH", "ARALING_PANLIPUNAN"],
    },
    TOURISM: {
        required: ["ENGLISH", "FILIPINO"],
        preferred: ["ARALING_PANLIPUNAN", "FOREIGN_LANGUAGE"],
        optional: ["MATH", "SCIENCE", "TLE", "COMPUTER", "MAPEH"],
    },
};

const TRACK_INDUSTRY_MATCH = {
    STEM: {
        BUSINESS_PROCESS_OUTSOURCING: 80,
        AGRICULTURE: 80,
        HEALTHCARE: 100,
        MANUFACTURING: 80,
        CONSTRUCTION: 100,
        FINANCIAL_SERVICES: 70,
        TECHNOLOGY: 95,
        TOURISM: 50,
    },
    HUMSS: {
        BUSINESS_PROCESS_OUTSOURCING: 85,
        AGRICULTURE: 50,
        HEALTHCARE: 70,
        MANUFACTURING: 80,
        CONSTRUCTION: 50,
        FINANCIAL_SERVICES: 75,
        TECHNOLOGY: 65,
        TOURISM: 90,
    },
    ABM: {
        BUSINESS_PROCESS_OUTSOURCING: 90,
        AGRICULTURE: 40,
        HEALTHCARE: 60,
        MANUFACTURING: 50,
        CONSTRUCTION: 65,
        FINANCIAL_SERVICES: 100,
        TECHNOLOGY: 75,
        TOURISM: 85,
    },
    "HOME ECONOMICS": {
        BUSINESS_PROCESS_OUTSOURCING: 60,
        AGRICULTURE: 70,
        HEALTHCARE: 80,
        MANUFACTURING: 85,
        CONSTRUCTION: 75,
        FINANCIAL_SERVICES: 65,
        TECHNOLOGY: 55,
        TOURISM: 95,
    },
    ICT: {
        BUSINESS_PROCESS_OUTSOURCING: 80,
        AGRICULTURE: 50,
        HEALTHCARE: 65,
        MANUFACTURING: 70,
        CONSTRUCTION: 75,
        FINANCIAL_SERVICES: 85,
        TECHNOLOGY: 95,
        TOURISM: 60,
    },
};

const ACADEMIC_STATUS_INDUSTRIES = {
    "Above Average": {
        BUSINESS_PROCESS_OUTSOURCING: 70,
        AGRICULTURE: 60,
        HEALTHCARE: 85,
        MANUFACTURING: 70,
        CONSTRUCTION: 75,
        FINANCIAL_SERVICES: 90,
        TECHNOLOGY: 95,
        TOURISM: 60,
    },
    Average: {
        BUSINESS_PROCESS_OUTSOURCING: 85,
        AGRICULTURE: 75,
        HEALTHCARE: 70,
        MANUFACTURING: 65,
        CONSTRUCTION: 70,
        FINANCIAL_SERVICES: 75,
        TECHNOLOGY: 80,
        TOURISM: 85,
    },
    "Low Average": {
        BUSINESS_PROCESS_OUTSOURCING: 90,
        AGRICULTURE: 85,
        HEALTHCARE: 55,
        MANUFACTURING: 80,
        CONSTRUCTION: 85,
        FINANCIAL_SERVICES: 60,
        TECHNOLOGY: 65,
        TOURISM: 95,
    },
};

const MEDICAL_RECORDS_INDUSTRIES = {
    "No History of Illness": {
        BUSINESS_PROCESS_OUTSOURCING: 100,
        AGRICULTURE: 100,
        HEALTHCARE: 100,
        MANUFACTURING: 100,
        CONSTRUCTION: 100,
        FINANCIAL_SERVICES: 100,
        TECHNOLOGY: 100,
        TOURISM: 100,
    },
    "Has History of Illness": {
        BUSINESS_PROCESS_OUTSOURCING: 75,
        AGRICULTURE: 60,
        HEALTHCARE: 70,
        MANUFACTURING: 65,
        CONSTRUCTION: 50,
        FINANCIAL_SERVICES: 80,
        TECHNOLOGY: 90,
        TOURISM: 75,
    },
};

const HOBBY_CRITERIA = {
    CREATIVE: {
        BUSINESS_PROCESS_OUTSOURCING: 60,
        AGRICULTURE: 50,
        HEALTHCARE: 40,
        MANUFACTURING: 50,
        CONSTRUCTION: 40,
        FINANCIAL_SERVICES: 55,
        TECHNOLOGY: 70,
        TOURISM: 90,
    },
    INTELLECTUAL: {
        BUSINESS_PROCESS_OUTSOURCING: 90,
        AGRICULTURE: 70,
        HEALTHCARE: 80,
        MANUFACTURING: 70,
        CONSTRUCTION: 60,
        FINANCIAL_SERVICES: 85,
        TECHNOLOGY: 100,
        TOURISM: 60,
    },
    PHYSICAL: {
        BUSINESS_PROCESS_OUTSOURCING: 50,
        AGRICULTURE: 80,
        HEALTHCARE: 60,
        MANUFACTURING: 70,
        CONSTRUCTION: 90,
        FINANCIAL_SERVICES: 40,
        TECHNOLOGY: 50,
        TOURISM: 80,
    },
};

const PSYCHOLOGICAL_ASSESSMENT = {
    COGNITIVE_ABILITIES: {
        BUSINESS_PROCESS_OUTSOURCING: 80,
        AGRICULTURE: 70,
        HEALTHCARE: 90,
        MANUFACTURING: 75,
        CONSTRUCTION: 80,
        FINANCIAL_SERVICES: 85,
        TECHNOLOGY: 95,
        TOURISM: 60,
    },
    EMOTIONAL_INTELLIGENCE: {
        BUSINESS_PROCESS_OUTSOURCING: 70,
        AGRICULTURE: 65,
        HEALTHCARE: 100,
        MANUFACTURING: 60,
        CONSTRUCTION: 75,
        FINANCIAL_SERVICES: 80,
        TECHNOLOGY: 85,
        TOURISM: 50,
    },
    PERSONALITY_TRAITS: {
        BUSINESS_PROCESS_OUTSOURCING: 85,
        AGRICULTURE: 80,
        HEALTHCARE: 70,
        MANUFACTURING: 65,
        CONSTRUCTION: 70,
        FINANCIAL_SERVICES: 90,
        TECHNOLOGY: 80,
        TOURISM: 95,
    },
};



// Edit this object to change the weight of each criteria this must be equal to 100
const recommendationPercentageBasis = {
    grades: 25, 
    track: 10, 
    academicStatus: 5,
    medicalRecord: 5, 
    hobbies: 5,
    psych_results: 50,
}


// Grade classification functions
const isAbove = (grade) => grade >= 88;
const isAverage = (grade) => grade >= 75 && grade < 88;

// Helper function to calculate industry score
const calculateIndustryScore = async (grades, criteria) => {
    let score = 0;

    // Scoring logic
    for (const subject of criteria.required) {
        if (isAbove(grades[subject])) score += 2; // High priority
    }

    for (const subject of criteria.preferred) {
        if (isAbove(grades[subject])) score += 1.5;
        else if (isAverage(grades[subject])) score += 1; // Medium priority
    }

    for (const subject of criteria.optional) {
        if (isAbove(grades[subject])) score += 1;
        else if (isAverage(grades[subject])) score += 0.5; // Low priority
    }

    return score;
};

async function recommendIndustriesByGrades(grades) {
    const industryScores = {};

    // Calculate scores for each industry
    for (const industry of Object.keys(INDUSTRY_CRITERIA)) {
        industryScores[industry] = await calculateIndustryScore(grades, INDUSTRY_CRITERIA[industry]);
    }

    // Convert scores to percentages
    const maxScore = Math.max(...Object.values(industryScores));
    const industryPercentages = {};

    for (const [industry, score] of Object.entries(industryScores)) {
        const percentage = ((score / maxScore) * 100);
        const subjectPercentage = (recommendationPercentageBasis.grades * percentage / 100).toFixed(2);
        industryPercentages[industry] = parseFloat(subjectPercentage);
    }

    return industryPercentages;
}

async function recommendIndustriesByTrack(trackName) {
    const industries = TRACK_INDUSTRY_MATCH[trackName.toUpperCase()];

    if (!industries) {
        return { error: `Invalid track name: ${trackName}` };
    }

    const recommendations = Object.entries(industries).reduce((result, [industry, percentage]) => {
        const subjectPercentage = (recommendationPercentageBasis.track * percentage / 100).toFixed(2);
        result[industry] = parseFloat(subjectPercentage);
        return result;
    }, {});

    return recommendations;
}

async function recommendIndustriesByAcademicStatus(status) {
    const industries = ACADEMIC_STATUS_INDUSTRIES[status];

    if (!industries) {
        return `Invalid academic status: ${status}`;
    }

    const industryPercentages = {};
    for (const [industry, percentage] of Object.entries(industries)) {
        const trackPercentage = (recommendationPercentageBasis.academicStatus * percentage / 100).toFixed(2);
        industryPercentages[industry] = parseFloat(trackPercentage);
    }

    return industryPercentages;
}

async function recommendIndustriesByMedicalRecord(recordStatus) {
    const industries = MEDICAL_RECORDS_INDUSTRIES[recordStatus];

    if (!industries) {
        return `Invalid medical record status: ${recordStatus}`;
    }

    const industryPercentages = {};
    for (const [industry, percentage] of Object.entries(industries)) {
        const trackPercentage = (recommendationPercentageBasis.medicalRecord * percentage / 100).toFixed(2);
        industryPercentages[industry] = parseFloat(trackPercentage);
    }

    return industryPercentages;
}

async function recommendIndustriesByHobbies(hobbies) {
    const hobbyScores = {
        CREATIVE: 0,
        INTELLECTUAL: 0,
        PHYSICAL: 0,
    };

    // Calculate scores for each hobby classification
    for (const hobby of hobbies) {
        if (HOBBY_CRITERIA[hobby]) {
            const industries = HOBBY_CRITERIA[hobby];
            for (const [industry, percentage] of Object.entries(industries)) {
                hobbyScores[hobby] += percentage;
            }
        }
    }

    return hobbyScores;
}

async function recommendIndustriesByPsychologicalAssessment(assessmentData) {
    const industryPercentages = {};

    // Iterate through each psychological category and calculate its score for each industry
    for (const [category, values] of Object.entries(PSYCHOLOGICAL_ASSESSMENT)) {
        const assessmentValue = assessmentData[category];  // e.g., COGNITIVE_ABILITIES, EMOTIONAL_INTELLIGENCE, etc.
        
        if (assessmentValue !== undefined && values[assessmentValue] !== undefined) {
            const categoryScore = values[assessmentValue];

            // Apply score to each industry, weighted by the psych_results percentage
            for (const [industry, percentage] of Object.entries(values)) {
                const industryScore = (recommendationPercentageBasis.psych_results * categoryScore * percentage / 10000).toFixed(2);
                if (!industryPercentages[industry]) {
                    industryPercentages[industry] = parseFloat(industryScore);
                } else {
                    industryPercentages[industry] += parseFloat(industryScore);
                }
            }
        }
    }

    return industryPercentages;
}



async function recommend(studentData) {
    const resultScore = {};
    const { grades, academicTrack, vocationalTrack, academicStatus, medicalRecord, hobbies, psych_results } = studentData;

    const track = academicTrack || vocationalTrack;

    const subjectScore = await recommendIndustriesByGrades(grades);
    const trackScore = await recommendIndustriesByTrack(track);
    const academicStatusScore = await recommendIndustriesByAcademicStatus(academicStatus);
    const medicalRecordScore = await recommendIndustriesByMedicalRecord(medicalRecord);
    const hobbyScore = await recommendIndustriesByHobbies(hobbies);
    const psychResultsScore = await recommendIndustriesByPsychologicalAssessment(psych_results);

    Object.keys(subjectScore).forEach((industry) => {
        resultScore[industry] = (subjectScore[industry] ?? 0) +
            (trackScore[industry] ?? 0) +
            (academicStatusScore[industry] ?? 0) +
            (medicalRecordScore[industry] ?? 0) +
            (hobbyScore[industry] ?? 0) +
            (psychResultsScore[industry] ?? 0);
    });

    const highestIndustry = Object.entries(resultScore).reduce(
        (max, [industry, score]) =>
            score > max.score ? { industry, score } : max,
        { industry: null, score: 0 }
    );

    // Sort industries by their scores in descending order
    const sortedIndustries = Object.entries(resultScore)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

    // Extract the top 3 industries
    const topIndustries = sortedIndustries.slice(0, 3).map(([industry, score]) => ({ industry, score }));

    return topIndustries 
}

export default recommend;
// =============================================================================

// TESTING 

// Weighted Scoring Algorithm


const studentData = {
    grades: {
        ENGLISH: 80,
        FILIPINO: 85,
        ARALING_PANLIPUNAN: 90,
        MATH: 80,
        SCIENCE: 90,
        COMPUTER: 70,
        TLE: 10,
        FOREIGN_LANGUAGE: 85,
        MAPEH: 78,
    },
    academicTrack: "HUMMS", // ABM, STEM, HUMMS 
    vocationalTrack: "", // Home Economic, ICT
    preferredCourse: "Culinary Arts",
    academicStatus: "Above Average", // "Above Average", "Average", "Low Average"
    medicalRecord: "No History of Illness", // "No History of Illness" or "Has History of Illness"
};

