import React from 'react';
import { KTSVG } from '../../../helpers';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as examCrud from '../../../../modules/exam-builder/redux/EXAMCRUD';
import { useDispatch } from 'react-redux';
import { actions } from '../../../../modules/exam-builder/redux/ExamRedux';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';

interface ExamBuilder {
    token: string;
}

export type Props = {
    show: boolean;
    handleClose: () => void;
};

const inits: ExamBuilder = {
    token: '',
};

const createAppSchema = Yup.object({
    token: Yup.string().required().label('Exam token'),
});

const ExamMain: React.FC<Props> = ({ show, handleClose }) => {
    const redirect = useRouter();
    const dispatch = useDispatch();
    const fetch_exam_token = async (values: ExamBuilder, formikActions: any) => {
        try {
            formikActions.setSubmitting(true);
            dispatch(actions.clearExam());
            const response = await examCrud.startExam(values.token);
            const { exam, quiz, questions } = response.data;
            const completeExam = { exam, quiz, questions };
            dispatch(actions.setExam(completeExam));
            dispatch(actions.setExamModulePath("ALI"));
            handleClose();
            redirect.push('/exam-attemption/quick-exam');
        } catch (error) {
            console.error('Error fetching exam token:', error);
        } finally {
            formikActions.setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className='modal-sticky modal-sticky-lg modal-sticky-bottom-right' backdrop={false}>
            <div className='modal-content'>
                <div className="modal-header">
                    <h2>Start your exam</h2>
                    <button type="button" className="btn btn-sm btn-icon btn-active-color-primary py-0" onClick={handleClose}>
                        <KTSVG path="/media/icons/duotune/arrows/arr061.svg" className="svg-icon-1" />
                    </button>
                </div>
                <div className="modal-body py-lg-10 px-lg-10">
                    <Formik
                        validationSchema={createAppSchema}
                        initialValues={inits}
                        onSubmit={fetch_exam_token}
                    >
                        {({ isSubmitting }) => (
                            <Form className="form" noValidate id="kt_modal_create_app_form">
                                <div className="fv-row mb-10">
                                    <label className="d-flex align-items-center fs-5 fw-bold mb-2">
                                        <span className="required">Token</span>
                                        <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify your unique token"></i>
                                    </label>
                                    <Field type="text" className="form-control form-control-lg form-control-solid" name="token" />
                                    <div className="text-danger">
                                        <ErrorMessage name="token" />
                                    </div>
                                </div>
                                <div className="d-flex flex-stack pt-10">
                                    <div>
                                        <button type="submit" className="btn btn-lg btn-primary me-3" disabled={isSubmitting}>
                                            <span className="indicator-label">
                                                Submit
                                                <KTSVG path="/media/icons/duotune/arrows/arr064.svg" className="svg-icon-3 ms-2 me-0" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export { ExamMain };
