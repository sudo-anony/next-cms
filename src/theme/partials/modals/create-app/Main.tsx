/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useRef, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { Formik, Form, FormikValues, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { StepperComponent } from '../../../assets/ts/components'
import { useDispatch } from 'react-redux';
import * as examCrud from '../../../../modules/exam-builder/redux/EXAMCRUD';
import { useRouter } from 'next/router';
import { actions } from '../../../../modules/exam-builder/redux/ExamRedux';

interface ICreateVirtualExam {
  subjectName: string
  category: string
  difficulty: string
  questionsCount: string

}

const inits: ICreateVirtualExam = {
  subjectName: '',
  category: '',
  difficulty: '',
  questionsCount: '',

}

const createAppSchema = [
  Yup.object({
    subjectName: Yup.string().required().label('Subject name'),
    category: Yup.string().required().label('Category'),
  }),
  Yup.object({
    difficulty: Yup.string().required().label('Difficulty'),
  }),
  Yup.object({
    questionsCount: Yup.string().required().label('Questions Count'),
  }),

]



const Main: FC = () => {
  const dispatch = useDispatch();
  const redirect = useRouter();
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAppSchema[0])
  const [initValues] = useState<ICreateVirtualExam>(inits)



  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAppSchema[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: ICreateVirtualExam, fActions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setCurrentSchema(createAppSchema[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      const virtualExam = async (values: ICreateVirtualExam, formikActions: any) => {
        try {
          formikActions.setSubmitting(true);
          dispatch(actions.clearExam());
          const formData = new FormData();
          formData.append('subject', values?.subjectName);
          formData.append('question_count', values?.questionsCount);
          formData.append('difficulty', values?.difficulty);
          formData.append('type', values?.category);
          console.log(formData);
          const response = await examCrud.createVirtualExam(formData);
          console.log(response);
          const { exam, quiz, questions } = response.data;
          const completeExam = { exam, quiz, questions };
          dispatch(actions.setExam(completeExam));
          dispatch(actions.setExamModulePath("ALI"));
          redirect.push('/virtual-exam');
        } catch (error) {
          console.error('Error fetching exam token:', error);
        } finally {
          formikActions.setSubmitting(false);
        }
      };
      virtualExam(values, fActions);
      // stepper.current.goto(1)
      // actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div className='modal fade' id='kt_modal_create_app' data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className='modal-dialog modal-dialog-centered mw-900px'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>Virtual Exam</h2>

            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body py-lg-10 px-lg-10'>
            <div
              ref={stepperRef}
              className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
                <div className='stepper-nav ps-lg-10'>
                  <div className='stepper-item current' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>1</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Details</h3>

                      <div className='stepper-desc'>Subject Name</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>2</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Diffculty</h3>

                      <div className='stepper-desc'>Define your exam difficulty</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>3</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Total Questions</h3>

                      <div className='stepper-desc'>Total number of questions</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>5</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Release</h3>

                      <div className='stepper-desc'>Review and Submit</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex-row-fluid py-lg-5 px-lg-15'>
                <Formik
                  validationSchema={currentSchema}
                  initialValues={initValues}
                  onSubmit={submitStep}
                >
                  {() => (
                    <Form className='form' noValidate id='kt_modal_create_app_form'>
                      <div className='current' data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className='required'>Subject Title</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify your unique app name'
                              ></i>
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-lg form-control-solid'
                              name='subjectName'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='subjectName' />
                            </div>
                          </div>

                          <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Category</span>

                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Select your app category'
                              ></i>
                            </label>

                            <div className='fv-row'>
                              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-primary'>
                                      <KTSVG
                                        path='/media/icons/duotune/maps/map004.svg'
                                        className='svg-icon-1 svg-icon-primary'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Multiple Choice</span>

                                    <span className='fs-7 text-muted'>
                                      Our AI will generate a multiple choice exam for you
                                      according to your requirement.
                                    </span>
                                  </span>
                                </span>

                                <span className='form-check form-check-custom form-check-solid'>
                                  <Field
                                    className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='multipleChoice'
                                  />
                                </span>
                              </label>

                              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-danger  '>
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen024.svg'
                                        className='svg-icon-1 svg-icon-danger'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Explnation Questions</span>

                                    <span className='fs-7 text-muted'>
                                      Creating a explnaion question for essay type questions
                                    </span>
                                  </span>
                                </span>

                                <span className='form-check form-check-custom form-check-solid'>
                                  <Field
                                    className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='explanation'
                                  />
                                </span>
                              </label>

                              <label className='d-flex flex-stack cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-success'>
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen013.svg'
                                        className='svg-icon-1 svg-icon-success'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Coding</span>

                                    <span className='fs-7 text-muted'>
                                      Our AI will generate coding question for you.
                                    </span>
                                  </span>
                                </span>

                                <span className='form-check form-check-custom form-check-solid'>
                                  <Field
                                    className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='coding'
                                  />
                                </span>
                              </label>
                            </div>

                            <div className='text-danger'>
                              <ErrorMessage name='category' />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Select your level</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify your apps difficulty'
                              ></i>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-warning'>
                                    <i className='fab fa-html5 text-warning fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Easy</span>

                                  <span className='fs-7 text-muted'>Basic questions</span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='difficulty'
                                  value='easy'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-success'>
                                    <i className='fab fa-react text-success fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Medium</span>
                                  <span className='fs-7 text-muted'>
                                    Medium Level questions
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='difficulty'
                                  value='medium'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-danger'>
                                    <i className='fab fa-angular text-danger fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Hard</span>
                                  <span className='fs-7 text-muted'>Extreme hard questions</span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='difficulty'
                                  value='hard'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-primary'>
                                    <i className='fab fa-vuejs text-primary fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Extreme</span>
                                  <span className='fs-7 text-muted'>
                                    Professional
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='difficulty'
                                  value='extreme'
                                />
                              </span>
                            </label>
                          </div>
                          <div className='text-danger'>
                            <ErrorMessage name='difficulty' />
                          </div>
                        </div>
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Select Questions Available</span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-success'>
                                    <i className='fas fa-database text-success fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>5</span>

                                  <span className='fs-7 text-muted'>You will be given 5 questions</span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='questionsCount'
                                  value='5'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-danger'>
                                    <i className='fab fa-google text-danger fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>10</span>

                                  <span className='fs-7 text-muted'>
                                    You will be asked 10 questions
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='questionsCount'
                                  value='10'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-warning'>
                                    <i className='fab fa-amazon text-warning fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>20</span>

                                  <span className='fs-7 text-muted'>
                                    You will be asked 20 questions
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='questionsCount'
                                  value='20'
                                />
                              </span>
                            </label>
                          </div>

                          <div className='text-danger'>
                            <ErrorMessage name='questionsCount' />
                          </div>
                        </div>
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='w-100 text-center'>
                          <h1 className='fw-bolder text-dark mb-3'>Release!</h1>

                          <div className='text-muted fw-bold fs-3'>
                            Submit your selection to kickstart your exam.
                          </div>

                          <div className='text-center px-4 py-15'>
                            <img
                              src={toAbsoluteUrl('/media/illustrations/sketchy-1/9.png')}
                              alt=''
                              className='w-100 mh-300px'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='d-flex flex-stack pt-10'>
                        <div className='me-2'>
                          <button
                            onClick={prevStep}
                            type='button'
                            className='btn btn-lg btn-light-primary me-3'
                            data-kt-stepper-action='previous'
                          >
                            <KTSVG
                              path='/media/icons/duotune/arrows/arr063.svg'
                              className='svg-icon-4 me-1'
                            />
                            Back
                          </button>
                        </div>

                        <div>
                          <button type='submit' className='btn btn-lg btn-primary me-3'>
                            <span className='indicator-label'>
                              {stepper.current?.currentStepIndex !==
                                stepper.current?.totatStepsNumber! - 1 && 'Continue'}
                              {stepper.current?.currentStepIndex ===
                                stepper.current?.totatStepsNumber! - 1 && 'Submit'}
                              <KTSVG
                                path='/media/icons/duotune/arrows/arr064.svg'
                                className='svg-icon-3 ms-2 me-0'
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Main }
