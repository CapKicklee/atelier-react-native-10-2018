import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        filter: 'all'
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie a changé', nouvelleSaisie)
        this.setState({ texteSaisie: nouvelleSaisie});
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        console.log('Vous avez cliqué sur Valider !')
        this.setState(prev => ({
            ...prev,
            actions: [...prev.actions, { titre: this.state.texteSaisie, done: false }]
        }));
    }

    supprimerAction = index => {
        this.setState(prev => ({
            ...prev,
            actions: prev.actions.filter((v, i) => i !== index)
        }))
    }

    terminerAction = index => {
        this.setState(prev => ({
            ...prev,
            actions: prev.actions.map(
                (action, i) => i === index ? {
                    ...action,
                    done: !action.done
                } : action
            )
        }));
    }

    terminees = () => {
        this.setState(prev => ({
            filter: 'done'
        }))
    }

    actives = () => {
        this.setState(prev => ({
            filter: 'active'
        }))
    }

    all = () => {
        this.setState(prev => ({
            filter: 'all'
        }))
    }

    filterActions() {
        if (this.state.filter === 'done') {
            return this.state.actions.filter((action, i) => action.done === true);
        } else if (this.state.filter === 'active') {
            return this.state.actions.filter((action, i) => action.done === false);
        } else {
            return this.state.actions;
        }
    }

    render() {
        const {texteSaisie, actions, filter} = this.state

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='never' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions actions={this.filterActions()} onSupprimer={this.supprimerAction} onTerminer={this.terminerAction}/>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu all={this.all} actives={this.actives} terminees={this.terminees} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})