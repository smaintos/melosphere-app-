import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const AdminPannel = () => {
    const [users, setUsers] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newPseudo, setNewPseudo] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [editingNewPseudo, setEditingNewPseudo] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch('http://192.168.214.2:3002/recupusers');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Erreur :', error);
            }
        };

        getUsers();
    }, []);

    const deleteUser = async (pseudoOrEmail) => {
        try {
            const response = await fetch(`http://192.168.214.2:3002/deleteUser/${pseudoOrEmail}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'utilisateur');
            }
            const updatedUsers = users.filter(user => user.pseudo !== pseudoOrEmail && user.email !== pseudoOrEmail);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    const updateUserPseudo = async (pseudo) => {
        try {
            const response = await fetch(`http://192.168.214.2:3002/updateUser/${pseudo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPseudo: editingNewPseudo }),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du pseudo de l\'utilisateur');
            }
            const updatedUsers = users.map(user => user.pseudo === pseudo ? { ...user, pseudo: editingNewPseudo } : user);
            setUsers(updatedUsers);
            setEditingUser(null);
            setEditingNewPseudo('');
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'newPseudo') {
            setNewPseudo(value);
        } else if (name === 'newEmail') {
            setNewEmail(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        }
    };

    const handleEditInputChange = (event) => {
        setEditingNewPseudo(event.target.value);
    };

    const handleEditClick = (pseudo) => {
        setEditingUser(pseudo);
        setEditingNewPseudo(pseudo);
    };

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        updateUserPseudo(editingUser);
    };

    const handleAddUserSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://192.168.214.2:3002/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pseudo: newPseudo, email: newEmail, mot_de_passe: newPassword }),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
            }
            const userData = await response.json();
            setUsers([userData, ...users]);
            setNewPseudo('');
            setNewEmail('');
            setNewPassword('');
            window.location.reload();
        } catch (error) {
            console.error('Erreur :', error);
        }
    };
    

    return (
        <div>
            <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="container mx-auto px-4 mt-32">
                <h2 className="text-2xl font-bold mb-4">Melosphere Admin Panel</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pseudo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Playlists</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <form onSubmit={handleAddUserSubmit} className="flex space-x-2">
                                    <input
                                        type="text"
                                        name="newPseudo"
                                        className="border-2 border-black p-1"
                                        value={newPseudo}
                                        onChange={handleInputChange}
                                        placeholder="Nouveau pseudo"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="newEmail"
                                        className="border-2 border-black p-1"
                                        value={newEmail}
                                        onChange={handleInputChange}
                                        placeholder="Nouvel email"
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="border-2 border-black p-1"
                                        value={newPassword}
                                        onChange={handleInputChange}
                                        placeholder="Nouveau mot de passe"
                                        required
                                    />
                                    <button className="ml-[3rem]" type="submit">Ajouter un utilisateur</button>
                                </form>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingUser === user.pseudo ? (
                                        <div className="flex justify-between items-center">
                                            <input type="text" value={editingNewPseudo} onChange={handleEditInputChange} placeholder="Nouveau pseudo" />
                                        </div>
                                    ) : (
                                        <span>{user.pseudo}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.playlist_count}</td>
                                <td className="px-6 py-nowrap flex justify-between">
                                    <div className="flex">
                                        <button onClick={() => handleEditClick(user.pseudo)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    </div>

                                    <div className="flex justify-end">
                                        <button onClick={() => deleteUser(user.pseudo)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </div>
                                    {editingUser === user.pseudo && (
                                        <button onClick={handleUpdateSubmit} className="text-green-600 hover:text-green-900 ml-2">Mettre à jour</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPannel;
