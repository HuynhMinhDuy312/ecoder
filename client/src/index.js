import Global from '@components/Global/Global';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Routes,
    Outlet,
} from 'react-router-dom';
import {
    Course,
    PopularCourses,
    FavoriteCourse,
    Home,
    Lesson,
    SavedCourse,
    Authentication,
    User,
    History,
    ProtectedRoute,
    Language,
    Courses,
} from './components';
import Wrapper from './components/Wrapper/Wrapper';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Global>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route path="/" element={<Wrapper />}>
                            <Route index element={<Home />} />

                            <Route
                                path="courses"
                                element={<Outlet />}
                            >
                                <Route
                                    path="popular"
                                    element={<PopularCourses />}
                                />
                                <Route
                                    path="search"
                                    element={<Courses />}
                                />
                                <Route
                                    path=":slug"
                                    element={<Course />}
                                />
                            </Route>

                            <Route
                                path="languages"
                                element={<Language />}
                            />

                            <Route
                                path="authentication"
                                element={<Authentication />}
                            />

                            <Route
                                path="/"
                                element={<ProtectedRoute />}
                            >
                                <Route
                                    path="favorite-course"
                                    element={<FavoriteCourse />}
                                />
                                <Route
                                    path="saved-course"
                                    element={<SavedCourse />}
                                />
                                <Route
                                    path="user"
                                    element={<User />}
                                />
                                <Route
                                    path="history"
                                    element={<History />}
                                />
                            </Route>
                        </Route>
                    </Route>

                    <Route path=":slug" element={<ProtectedRoute />}>
                        <Route path="learn" element={<Lesson />} />

                        <Route
                            path="*"
                            element={<h1>Không có gì ở đây cả</h1>}
                        />
                    </Route>

                    <Route
                        path="*"
                        element={<h1>Không có gì ở đây cả</h1>}
                    />
                </Routes>
            </BrowserRouter>
        </Global>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
