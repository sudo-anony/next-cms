import React, { useEffect, useState } from 'react';
import { QuestionDiscussion } from '../models/models';
import { KTSVG, toAbsoluteUrl } from '../../../theme/helpers'
import * as crud from '../redux/EXAMCRUD';
import { UserModel } from '../../auth/models/UserModel';
const Discussion: React.FC<{ discussion: QuestionDiscussion }> = (data) => {

    const [discussionAuthor, setDiscussionAuthor] = useState<UserModel | undefined>(undefined);

    useEffect(() => {
        fetchDiscussionAuthor();
    }, []);

    const fetchDiscussionAuthor = async () => {
        const discussionAuthorId = data?.discussion.user_id;
        if (discussionAuthorId !== undefined) {
            try {
                const author = await crud.fetchDisscussionAuthor(discussionAuthorId);
                console.log(author)
                setDiscussionAuthor(author);
            } catch (error) {
                console.error('Error fetching possible answers:', error);
            }
        }
    };
    return (
        <div className='card mb-5 mb-xxl-8'>
            <div className='card-body pb-0'>
                <div className='d-flex align-items-center mb-3'>
                    <div className='d-flex align-items-center flex-grow-1'>
                        <div className='symbol symbol-45px me-5'>
                            <img src={toAbsoluteUrl('/media/avatars/150-10.jpg')} alt='' />
                        </div>
                        <div className='d-flex flex-column'>
                            <a href='#' className='text-gray-800 text-hover-primary fs-6 fw-bolder'>
                                {discussionAuthor?.first_name} {discussionAuthor?.last_name}
                            </a>
                            <span className='text-gray-400 fw-bold'>Yestarday at 5:06 PM</span>
                        </div>
                    </div>
                </div>
                <div className='mb-7'>
                    <div className='text-gray-800 mb-5'>
                        {data.discussion.content}
                    </div>
                    <div className='d-flex align-items-center mb-5'>
                        <a
                            href='#'
                            className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'
                        >
                            <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-2' />
                            12
                        </a>

                        <a
                            href='#'
                            className='btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2'
                        >
                            <KTSVG path='/media/icons/duotune/general/gen030.svg' className='svg-icon-2' />
                            150
                        </a>
                    </div>
                </div>
                <div className='mb-7 ps-10'>
                    <div className='d-flex mb-5'>
                        <div className='symbol symbol-45px me-5'>
                            <img src={toAbsoluteUrl('/media/avatars/150-11.jpg')} alt='' />
                        </div>
                        <div className='d-flex flex-column flex-row-fluid'>
                            <div className='d-flex align-items-center flex-wrap mb-1'>
                                <a href='#' className='text-gray-800 text-hover-primary fw-bolder me-2'>
                                    Alice Danchik
                                </a>

                                <span className='text-gray-400 fw-bold fs-7'>1 day</span>

                                <a href='#' className='ms-auto text-gray-400 text-hover-primary fw-bold fs-7'>
                                    Reply
                                </a>
                            </div>
                            <span className='text-gray-800 fs-7 fw-normal pt-1'>
                                Long before you sit dow to put digital pen to paper you need to make sure you have
                                to sit down and write.
                            </span>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='symbol symbol-45px me-5'>
                            <img src={toAbsoluteUrl('/media/avatars/150-8.jpg')} alt='' />
                        </div>
                        <div className='d-flex flex-column flex-row-fluid'>
                            <div className='d-flex align-items-center flex-wrap mb-1'>
                                <a href='#' className='text-gray-800 text-hover-primary fw-bolder me-2'>
                                    Harris Bold
                                </a>

                                <span className='text-gray-400 fw-bold fs-7'>2 days</span>

                                <a href='#' className='ms-auto text-gray-400 text-hover-primary fw-bold fs-7'>
                                    Reply
                                </a>
                            </div>

                            <span className='text-gray-800 fs-7 fw-normal pt-1'>
                                Outlines keep you honest. They stop you from indulging in poorly
                            </span>
                        </div>
                    </div>
                </div>
                <div className='separator mb-4'></div>
                <form className='position-relative mb-6'>
                    <textarea
                        className='form-control border-0 p-0 pe-10 resize-none min-h-25px'
                        data-kt-autosize='true'
                        rows={1}
                        placeholder='Reply..'
                    ></textarea>

                    <div className='position-absolute top-0 end-0 me-n5'>
                        <span className='btn btn-icon btn-sm btn-active-color-primary pe-0 me-2'>
                            <KTSVG
                                path='/media/icons/duotune/communication/com012.svg'
                                className='svg-icon-3 mb-3'
                            />
                        </span>

                        <span className='btn btn-icon btn-sm btn-active-color-primary ps-0'>
                            <KTSVG path='/media/icons/duotune/general/gen018.svg' className='svg-icon-2 mb-3' />
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { Discussion }
