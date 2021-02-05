import { useEffect, useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [courseList, setCourseList] = useState([]);

  const addCourse = () => {
    axios
      .post('https://simple-mern-crud-app.herokuapp.com/add-course', {
        courseName,
        authorName,
      })
      .then((res) => {
        setCourseList([
          ...courseList,
          { _id: res.data._id, courseName, authorName },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatedCourse = (id) => {
    const newCourseName = prompt('Enter new course name:');
    axios
      .put('https://simple-mern-crud-app.herokuapp.com/update', {
        newCourseName,
        id,
      })
      .then(() => {
        setCourseList(
          courseList.map((item) => {
            return item._id === id
              ? {
                  _id: id,
                  courseName: newCourseName,
                  authorName: item.authorName,
                }
              : item;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCourse = (id) => {
    axios
      .delete(`https://simple-mern-crud-app.herokuapp.com/${id}`)
      .then(() => {
        setCourseList(
          courseList.filter((item) => {
            return item._id !== id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get('https://simple-mern-crud-app.herokuapp.com/read')
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className="AddCourse shadow-lg rounded-3 p-5 my-5 mx-2">
            <div className="AddCourse-title text-center mb-5">
              <h2>Add Course</h2>
              <hr />
            </div>
            <div className="AddCourse-content">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Course Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter Course Name"
                  onChange={(event) => {
                    setCourseName(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author Name
                </label>
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  placeholder="Enter Author Name"
                  onChange={(event) => {
                    setAuthorName(event.target.value);
                  }}
                />
              </div>
              <div className="mt-4 d-grid">
                <button className="btn btn-dark py-2" onClick={addCourse}>
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="course-list my-5 mx-2 p-5 shadow-lg rounded-3">
            <div className="course-list-title text-center mb-5">
              <h2>Course List</h2>
              <hr />
            </div>
            {courseList.map((item, index) => {
              return (
                <div
                  className="item shadow rounded-3 mb-4 px-5 py-3"
                  key={index}
                >
                  <button
                    className="btn btn-dark btn-sm mx-1 float-end mt-5"
                    onClick={() => updatedCourse(item._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-dark btn-sm mx-1 float-end mt-5"
                    onClick={() => deleteCourse(item._id)}
                  >
                    Delete
                  </button>
                  <h3>{item.courseName}</h3>
                  <p className="lead mt-3">{item.authorName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
