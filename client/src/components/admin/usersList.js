import React, { Fragment, useEffect } from "react";
import "../../styles/adminUser.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, clearErrors, deleteUser } from "../../redux/actions/adminActions";
import { DELETE_USER_RESET } from '../../redux/reducers/adminReducer'
import { toast } from 'react-hot-toast';

const UsersList = ({ history }) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        error: deleteError,
        isDeleted,
        message,
        users,
      } = useSelector((state) => state.admin);
    
      const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
        dispatch({ type: DELETE_USER_RESET });
      };

    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success(message);
            navigate("/allUsers");
            // dispatch({ type: DELETE_USER_RESET });
          }

        dispatch(getAllUsers());
    }, [dispatch, deleteError, navigate]);

    return (
        <Fragment>
            <div className="usersListContainer">
            <Link className='back' to={'/'}>Back</Link>
                <h1>All Users</h1>
                <table className="users-table">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Action</th>

                    </tr>

                    {users && Array.isArray(users) && users.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.username}</td>
                            <td>{item.class}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td className="actionLink"><Link className="actionBtn" to={`/admin/editUser/${item._id}`}>
                                Edit
                            </Link><Link className="actionBtn" onClick={()=>deleteUserHandler(item._id)}>
                                    Delete
                                </Link></td>

                        </tr>
                    ))}
                </table>
            </div>
        </Fragment>
    );
};

export default UsersList;
