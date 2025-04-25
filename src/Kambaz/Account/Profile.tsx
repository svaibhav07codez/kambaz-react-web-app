import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    const fetchProfile = () => {
        if (!currentUser) return navigate("/Kambaz/Account/Signin");
        setProfile(currentUser);
    };
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };
    useEffect(() => { fetchProfile(); }, []);

    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <Form>
                        <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
                        <Form.Group className="my-2" controlId="formUsername">
                            <Form.Control type="text" id="wd-username" defaultValue={profile.username} placeholder="Username" onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formPassword">
                            <Form.Control type="password" defaultValue={profile.password} placeholder="Password" onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formFirstName">
                            <Form.Control type="text" defaultValue={profile.firstName} placeholder="First Name" onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formLastName">
                            <Form.Control type="text" defaultValue={profile.lastName} placeholder="Last Name" onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formDOB">
                            <Form.Control type="date" defaultValue={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formEmail">
                            <Form.Control type="email" defaultValue={profile.email} placeholder="Email" onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formRole">
                            <Form.Select defaultValue="STUDENT" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </Form.Select>
                        </Form.Group>
                        <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                            Sign out
                        </Button>
                    </Form>
                </div>

            )}
        </div>
    );
}