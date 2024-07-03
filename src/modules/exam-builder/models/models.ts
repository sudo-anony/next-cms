export interface ExamModel {
    id: number;
    title: string;
    quizId: number;
    userId: number;
    token: string;
    accuracy: number;
    status: string;
  }
  
  export interface QuizModel {
    id: number;
    title: string;
    start_date: string; 
    expire_date: string;
    userId: number;
}

  export interface QuestionModel {
    id: number;
    title: string;
    userId: number;
    description: string;
  }
  

  export interface CompleteExam {
    exam: ExamModel;
    quiz: QuizModel;
    questions: QuestionModel[];
  }

  export interface PossibleAnswer {
    id: number,
    content: string
    correct: boolean
  }

  export interface Answer {
    possible_answer_id: number
    correct: boolean
    id: number
    content: string
  }

  export interface QuestionDiscussion {
    id: number,
    content: string,
    user_id: number
  }

  export interface ClassifiedData {
    title: string;
    type: string;
    token: string;
    startDate: string;
    expireDate: string;
    accuracy: number | null;
    questionsCount: string;
    status: string;
    showToken: boolean;
}



export interface ResultData {
  exam: ExamModel;
  quiz: QuizModel;
  submitted_data: Array<{
      question: QuestionModel;
      answer: Answer;
  }>;
}

export interface RecommendationProps {
  accuracyPercentage: number;
  difficulty: string;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
}