import React, { useContext } from 'react';
import { View, FlatList, Alert } from 'react-native'
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: "Sim",
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: "Não"
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                bottomDivider
                style={{margin:3}}
                //onPress={() => props.navigation.navigate('UserForm')}
            >
                <Avatar
                    size={60}
                    rounded
                    title={user.name}
                    Subtitle={user.email}
                    source={{ uri: user.avatarUrl ? user.avatarUrl : 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png'  }}
                />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    iconProps={{ name: "edit" }}
                    iconStyle={{ fontSize: 25, color: 'rgb(121, 134, 203)' }}
                />
                <ListItem.Chevron
                    onPress={() => confirmUserDeletion(user)}
                    iconProps={{ name: 'delete' }}
                    iconStyle={{ fontSize: 25, color: 'rgb(239, 83, 80)' }}
                />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                style={{padding:5}}
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}