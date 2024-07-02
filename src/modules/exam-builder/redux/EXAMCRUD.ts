import axios ,  { AxiosPromise } from 'axios'
import { Answer, PossibleAnswer , QuestionDiscussion } from '../models/models'
import { UserModel } from '../../auth/models/UserModel'
import { QuizModel } from '../models/models';

const API_URL = process.env.NEXT_PUBLIC_API_URL
export const GET_EXAM_BY_ACCESSTOKEN = `${API_URL}/explorer/quick_exams/`;
export const FETCH_POSSIBLE_ANSWERS_URL = `${API_URL}/explorer/quick_exams/fetch_possible_answers`;
export const FETCH_QUESTION_DISCUSSIONS = `${API_URL}/explorer/quick_exams/fetch_question_discussion`;
export const FETCH_DISCUSSION_AUTHOR = `${API_URL}/user/fetch_user_by_id`;
export const FETCH_USER_CLASSFIED_EXAMS = `${API_URL}/explorer/quick_exams/fetch_classified_exams`;
export const FETCH_QUIZ_BY_EXAM_ID = `${API_URL}/explorer/quick_exams/fetch_quiz_by_exam`;
export const FETCH_SUBMITTED_ANSWER = `${API_URL}/explorer/quick_exams/fetch_submitted_answer`;
export const CREATE_VIRTUAL_EXAM = `${API_URL}/explorer/personalized_exams`;


export function startExam(token: string): AxiosPromise {
  return axios.get(GET_EXAM_BY_ACCESSTOKEN+token);
}

export async function fetchPossibleAnswers(id: number): Promise<PossibleAnswer[]> {
  const response = await axios.get<PossibleAnswer[]>(`${FETCH_POSSIBLE_ANSWERS_URL}?id=${id}`);
  return response.data;
}

export async function fetchQuestionDiscussions(id: number): Promise<QuestionDiscussion[]> {
  const response = await axios.get<QuestionDiscussion[]>(`${FETCH_QUESTION_DISCUSSIONS}?id=${id}`);
  return response.data;
}

export async function fetchDisscussionAuthor(id: number): Promise<UserModel> {
  const response = await axios.get<UserModel>(`${FETCH_DISCUSSION_AUTHOR}?id=${id}`);
  return response.data;
}

export async function fetchQuizByExamId(id: number): Promise<QuizModel> {
  const response = await axios.get<QuizModel>(`${FETCH_QUIZ_BY_EXAM_ID}?id=${id}`);
  return response.data;
}

export async function fetchUserClassfiedExams(offset: number,limit: number): Promise<any> {
  const response = await axios.get<any>(`${FETCH_USER_CLASSFIED_EXAMS}?offset=${offset}&limit=${limit}`);
  return response.data;
} 


export function createVirtualExam(formData: FormData): AxiosPromise {
  return axios.post(`${CREATE_VIRTUAL_EXAM}`, formData);
}

export function saveAnswer(id:number , possible_answer_id: number): AxiosPromise {
  return axios.post(`${API_URL}/explorer/quick_exams/${id}/submit_answer?possible_answer_id=${possible_answer_id}`);
}

export async function fetchSubmittedAnswer(id: number,question_id: number): Promise<Answer> {
  const response = await axios.get<any>(`${FETCH_SUBMITTED_ANSWER}?exam_id=${id}&question_id=${question_id}`);
  return response.data;
} 

