import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({all, actives, terminees}) => (
    <View style={styles.menu}>
        <OptionMenu nom="Toutes" onPress={() => all()} />
        <OptionMenu nom="Activées" onPress={() => actives()} />
        <OptionMenu nom="Terminées" onPress={() => terminees()} />
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu