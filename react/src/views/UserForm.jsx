import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/Contextprovider";

export default function UserForm() {

    const {id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext()
    const [user, setUser] = useState({id: null, name: '', email: '', password:'', password_confirmation:''})

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`).then(({data}) => {
                setLoading(false)
                setUser(data)
            }).catch(() => {
                setLoading(false)
            })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user).then(() => {
                //Todo show notifcation
                setNotification('User updated successfully')
                navigate('/users')
            }).catch(err => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                });
        } else {
            axiosClient.post(`/users`, user).then(() => {
                //Todo show notifcation
                setNotification('User created successfully')
                navigate('/users')
            }).catch(err => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                });
        }
    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {
                        errors && <div className='alert'>{Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}</div>
                    }
                    {!loading && <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
                        <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                        <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
                        <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
                        <button className="btn">Save</button>
                        </form>}
            </div>
        </>
    )
}