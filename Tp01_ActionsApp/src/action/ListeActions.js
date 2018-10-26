import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, onSupprimer, onTerminer}) => {

    return (
        <View>
            {actions.map((action, index) => <UneAction action={action} onSupprimer={() => onSupprimer(index)} onTerminer={() => onTerminer(index)} index={index} />)}
        </View>
            
    )
}

export default ListeActions