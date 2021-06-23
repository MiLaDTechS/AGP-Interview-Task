import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { GiHamburgerMenu } from 'react-icons/gi';
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../store/projects';
import { FaCog, FaSpinner, FaTimes } from 'react-icons/fa'
import { useLocalStorage } from '../utils';
import { getScores } from '../store/authUser';
import { logout } from '../store/sharedActions';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const projects = useSelector(state => state.entities.projects);
    const scores = useSelector(state => state.authUser.scores);

    const [isOpen, setIsOpen] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const { value: user } = useLocalStorage('user');

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getScores(user?.slug))
    }, [dispatch, user?.slug]);

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
        >
            <Toaster />

            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
                ariaHideApp={false}
            >
                <div className="flex flex-col">
                    <h3 className="mb-3 font-medium">{selectedProject.title}</h3>
                    <p className="text-gray-600 text-justify text-sm font-light mb-3">{selectedProject.text}</p>
                    <button className="focus:outline-none bg-green-600 text-white py-1 rounded-md w-1/2 self-end hover:bg-green-800 transition" onClick={toggleModal}>شرکت کردن</button>
                </div>
            </Modal>

            <div className="h-screen relative overflow-x-hidden sm:hidden">

                <div className={`menu_bar ${toggleMenu && 'active'}`}>
                    <div onClick={() => setToggleMenu(false)} className="bg-gray-300 mr-2 mt-2 rounded-full w-9 h-9 relative focus:outline-none flex items-center justify-center cursor-pointer">
                        <FaTimes fontSize={20} color="#333" />
                    </div>
                    <div className="flex items-center justify-end px-3" style={{ height: '70vh' }}>
                        <ul className="w-full">
                            <li className="text-gray-600 mb-5 flex justify-end cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-md items-center transition">
                                <span className="ml-4">پروژه ها</span>
                                <img src="/icons/Graph.svg" className="opacity-50" width="32px" height="32px" alt="document" />
                            </li>
                            <li className="text-gray-600 mb-5 flex justify-end cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-md items-center transition">
                                <span className="ml-4">حساب کاربری</span>
                                <img src="/icons/Profile.svg" className="opacity-50" width="32px" height="32px" alt="document" />
                            </li>
                            <li className="text-gray-600 mb-5 flex justify-end cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-md items-center transition">
                                <span className="ml-4">تنظیمات</span>
                                <FaCog color="#888" fontSize="32px" />
                            </li>
                            <li onClick={() => {
                                dispatch(logout()).then(() => {
                                    history.replace('/login')
                                });
                            }} className="text-gray-600 mb-5 flex justify-end cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-md items-center transition">
                                <span className="ml-4">خروج</span>
                                <img src="/icons/Logout.svg" className="opacity-50" width="32px" height="32px" alt="document" />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="h-14 flex items-center justify-between relative bg-gray-300">
                    <div className="bg-white rounded-l-full focus:outline-none flex items-center justify-center px-1.5 py-1">
                        <p className="text-xs leading-3 mx-1" style={{ fontFamily: 'VazirFD' }}>{scores?.overall_score}</p>
                        <img src="/icons/Star.svg" alt="score" />
                    </div>

                    <div onClick={() => setToggleMenu(true)} className="ml-3 bg-white rounded-full w-9 h-9 relative focus:outline-none flex items-center justify-center cursor-pointer">
                        <GiHamburgerMenu fontSize={20} color="#333" />
                    </div>
                </div>
                <div className="mob-content relative" style={{ height: 'calc(100vh - 56px)' }}>
                    <div>
                        <h3 className="my-5 px-3">لیست پروژه ها</h3>
                        {projects.loading === 'pending' ? (
                            <div className="flex px-3">
                                <p className="text-gray-600">درحال بارگذاری پروژه ها</p>
                                <FaSpinner color="blue" className="animate-spin mx-auto" fontSize="20px" />
                            </div>
                        ) : (
                            <ul className="px-3 text-sm project-list">
                                {projects.list.length ? projects.list.map((project, index) => (
                                    <li key={index} className="px-1.5 py-2.5 rounded-md flex mb-2 cursor-pointer transition" onClick={() => {
                                        setSelectedProject(project);
                                        toggleModal();
                                    }}>
                                        <img src="/icons/Document.svg" alt="document" />
                                        <span className="mr-2">{project.title}</span>
                                    </li>
                                )) : (
                                    <li className="px-1.5 py-2.5 rounded-md flex mb-2 cursor-pointer transition" onClick={() => {
                                        setSelectedProject({
                                            id: 1,
                                            title: 'پروژه اول',
                                            text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.'
                                        });
                                        toggleModal();
                                    }}>
                                        <img src="/icons/Document.svg" alt="document" />
                                        <span className="mr-2">پروژه اول</span>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-screen relative overflow-x-hidden bg-gray-100 hidden sm:block">
                <div className="absolute w-12 bottom-0 left-3 rounded-t-lg flex flex-col items-center" style={{ height: 'calc(100vh - 20px)', zIndex: '10', background: 'linear-gradient(0deg, rgba(100,23,119,1) 0%, rgba(200,45,237,1) 100%)' }}>
                    <div className="w-8 h-8 mt-2 bg-white rounded-full" />
                    <div className="absolute top-1/3">
                        <svg className="cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24">
                            <g id="Iconly/Bulk/Graph" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Graph" transform="translate(2.000000, 2.000000)" fill="#ffffff" fillRule="nonzero">
                                    <path d="M8.152754,3.55552761 C8.20368413,3.65919399 8.237323,3.77020981 8.2523868,3.88433813 L8.53082191,8.02425688 L8.53082191,8.02425688 L8.66903307,10.1050779 C8.67046167,10.3190591 8.7040335,10.5316649 8.76866587,10.7360386 C8.9355965,11.1325559 9.33716333,11.3845716 9.77405142,11.3669994 L16.4313342,10.9315476 C16.7196104,10.9267943 16.9980001,11.0346143 17.2052401,11.2312807 C17.3779401,11.3951693 17.4894372,11.6095651 17.524563,11.8401601 L17.5363525,11.9801866 C17.260866,15.7948982 14.4591587,18.9766559 10.6523561,19.797994 C6.84555351,20.6193322 2.94186389,18.8842999 1.06070995,15.534895 C0.518387516,14.5618191 0.179650312,13.4922526 0.0643819183,12.388978 C0.0162285779,12.0623771 -0.00497451535,11.7324952 0.000979225624,11.4025464 C-0.00496594783,7.31273376 2.90747021,3.77695779 6.98433295,2.92456686 C7.47500829,2.84816493 7.95602805,3.10792111 8.152754,3.55552761 Z" id="Path"></path>
                                    <path d="M10.8700123,0.000819186003 C15.42989,0.11682655 19.2623146,3.39578782 20,7.81229094 L19.9929553,7.84487576 L19.9929553,7.84487576 L19.9728274,7.89227188 L19.9756317,8.0223616 C19.9651826,8.19471218 19.8986437,8.36053991 19.7839681,8.49448471 C19.6645145,8.63401054 19.5013145,8.72903004 19.3215929,8.76590816 L19.2119951,8.78094898 L11.5312118,9.27860816 C11.2757261,9.30380455 11.0213466,9.22142251 10.8313499,9.05195453 C10.6730193,8.91073121 10.5717997,8.72009233 10.543203,8.5146766 L10.0276622,0.845062436 C10.0186901,0.819128783 10.0186901,0.791015148 10.0276622,0.765081496 C10.0347061,0.553672114 10.127765,0.353839855 10.2860482,0.210229821 C10.4443315,0.0666197874 10.6546487,-0.00880036929 10.8700123,0.000819186003 Z" id="Path" opacity="0.400000006"></path>
                                </g>
                            </g>
                        </svg>
                        <div className="flex justify-center mt-8 opacity-50 cursor-pointer">
                            <FaCog color="#fff" fontSize="24px" />
                        </div>
                    </div>
                </div>
                <div className="h-28 bg-gray-300" style={{ clipPath: 'ellipse(85% 60% at 50% 40%)' }}>
                    <div className="flex justify-end items-center px-20 h-24">
                        <div className="bg-white rounded-sm p-1 py-2 flex">
                            <div className="flex flex-col text-xs justify-center px-2 ml-4">
                                <span>امتیاز شما</span>
                                <span>4085</span>
                            </div>
                            <img src="/icons/Star.svg" width="40px" alt="score" />
                        </div>
                        <div className="bg-white mr-8 rounded-sm p-1 py-2 flex">
                            <div className="flex flex-col text-xs justify-center px-2">
                                <span className="text-left">علیرضا</span>
                                <span>temp-mail@gmail.com</span>
                            </div>
                            <img src="/images/avatar.png" className="py-.5 ml-1" width="40px" height="35px" alt="avatar" />
                        </div>
                    </div>
                </div>

                <div className="flex ml-16 mt-5 overflow-hidden">
                    <div className="w-5/12 p-5">
                        <div className="bg-white shadow-md rounded-md relative" style={{ height: 'calc(100vh - 200px)' }}>
                            <div className="absolute -top-5 right-0 text-white px-2 py-2 text-sm rounded-md z-10" style={{ backgroundColor: '#C82DED' }}>
                                لیست پروژه ها
                            </div>
                            <div className="h-full project-section">
                                {projects.loading === 'pending' ? (
                                    <div className="flex px-3 mt-8">
                                        <p className="text-gray-600">درحال بارگذاری پروژه ها</p>
                                        <FaSpinner color="blue" className="animate-spin mx-auto" fontSize="20px" />
                                    </div>
                                ) : (
                                    <ul className="px-3 text-sm project-list mt-8">
                                        {projects.list.length ? projects.list.map((project, index) => (
                                            <li key={index} onClick={() => {
                                                setSelectedProject(project);
                                            }} className="px-1.5 py-2.5 rounded-md flex mb-2 cursor-pointer transition">
                                                <img src="/icons/Document.svg" alt="document" />
                                                <span className="mr-2">{project.title}</span>
                                            </li>
                                        )) : (
                                            <li onClick={
                                                () => {
                                                    setSelectedProject({
                                                        id: 1,
                                                        title: 'پروژه اول',
                                                        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.'
                                                    });
                                                }
                                            } className="px-1.5 py-2.5 rounded-md flex mb-2 cursor-pointer transition">
                                                <img src="/icons/Document.svg" alt="document" />
                                                <span className="mr-2">پروژه اول</span>
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-7/12 p-5">
                        <div className="bg-white shadow-md rounded-md relative" style={{ height: 'calc(100vh - 200px)' }}>
                            <div className="absolute -top-5 right-0 text-white px-2 py-2 text-sm rounded-md" style={{ backgroundColor: '#C82DED' }}>
                                توضیحات پروژه
                            </div>
                            <div className={`h-full description-section ${selectedProject.id && 'selected'}`}>
                                <div className="flex justify-center mt-10 h-full">
                                    {selectedProject.id ? (
                                        <div className="w-full p-5 h-full relative">
                                            <h3 className="mb-4 font-medium">{selectedProject.title}</h3>
                                            <p className="text-sm font-light text-gray-600">{selectedProject.text}</p>
                                            <button className="focus:outline-none bg-green-600 text-white py-1 rounded-md w-1/4 self-end hover:bg-green-800 transition absolute bottom-14 left-5">شرکت کردن</button>
                                        </div>
                                    ) : (
                                        <h3 className="text-gray-400 font-medium">از پروژه های سمت راست انتخاب کنید</h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Home
