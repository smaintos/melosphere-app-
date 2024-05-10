import React, { useState, useEffect } from 'react';
import NavBar from '../Composants/NavBar';
import Sidebar from '../Composants/SideBar';

const AdminPannel = () => {
    const [users, setUsers] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newPseudo, setNewPseudo] = useState('');

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
            const updatedUsers = users.filter(user => user.pseudo!== pseudoOrEmail && user.email!== pseudoOrEmail);
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
                body: JSON.stringify({ newPseudo }),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du pseudo de l\'utilisateur');
            }
            const updatedUsers = users.map(user => user.pseudo === pseudo? {...user, pseudo: newPseudo} : user);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    const handleInputChange = (event) => {
        setNewPseudo(event.target.value);
    };

    const handleEditClick = (pseudo) => {
        setEditingUser(pseudo);
        setNewPseudo(pseudo);
    };

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        updateUserPseudo(editingUser);
    };

    return (
        <div>
            <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="container mx-auto px-4 mt-32">
                <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
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
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingUser === user.pseudo? (
                                        <div className="flex justify-between items-center">
                                            <input type="text" value={newPseudo} onChange={handleInputChange} placeholder="Nouveau pseudo" />
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
