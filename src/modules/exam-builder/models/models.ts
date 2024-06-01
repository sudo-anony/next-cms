export interface ExamModel {
    id: number;
    title: string;
    quizId: number;
    userId: number;
    token: string;
    accuracy: number;
  }
  
  export interface QuizModel {
    id: number;
    title: string;
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

  export interface QuestionDiscussion {
    id: number,
    content: string,
    user_id: number
  }