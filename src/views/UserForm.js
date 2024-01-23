import React, { useContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native'
import { Icon } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import UsersContext from '../context/UsersContext';

export default ({ route, navigation }) => {

    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext)

    return (
        <View style={style.form}>
            <View style={style.hd}>
                <Avatar
                    rounded
                    marginBottom={10}
                    size={150}
                    source={{ uri: user.avatarUrl ? user.avatarUrl : 'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png' }}
                />
                <Text style={{ color: 'rgba(26, 35, 126,0.7)', fontSize: 30, marginBottom: 10 }}>
                    {user.name}</Text>
            </View>
            <View style={style.direction}>
                <Icon
                    name="person"
                    size={18}
                    raised
                    color='rgb(92, 107, 192)'
                />
                <TextInput
                    style={style.input}
                    onChangeText={name => setUser({ ...user, name })}
                    placeholder='Informe o Nome'
                    placeholderTextColor='rgba(57, 73, 171, 0.5)'
                    value={user.name}
                />
            </View>
            <View style={style.direction}>
                <Icon
                    name="email"
                    size={18}
                    raised
                    color='rgb(92, 107, 192)'
                />
                <TextInput
                    style={style.input}
                    keyboardType='email-address'
                    onChangeText={email => setUser({ ...user, email })}
                    placeholder='Informe o e-mail'
                    placeholderTextColor='rgba(57, 73, 171, 0.5)'
                    value={user.email}
                />
            </View>
            <View style={style.direction}>
                <Icon
                    name="image"
                    size={18}
                    raised
                    color='rgb(92, 107, 192)'
                />
                <TextInput
                    style={style.input}
                    keyboardType='web-search'
                    onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                    placeholder='Informe a URL do Avatar'
                    placeholderTextColor='rgba(57, 73, 171, 0.5)'
                    value={user.avatarUrl}
                />
            </View>
            <View style={{paddingHorizontal:80, margin:20}}>
                <Button
                    color='rgb(57, 73, 171)'
                    title="Salvar"
                    onPress={() => {
                        dispatch({
                            type: user.id ? 'updateUser' : 'createUser',
                            payload: user,
                        })
                        navigation.goBack()
                    }}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    direction: {
        flexDirection: 'row'
    },
    form: {
        padding: 12
    },
    input: {
        flex: 1,
        height: 40,
        borderBottomColor: 'rgb(187, 222, 251)',
        borderBottomWidth: 1,
        marginBottom: 20,
        color: 'rgb(92, 107, 192)',
        borderRadius: 6
    },
    hd: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})