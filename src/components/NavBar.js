import React from 'react'
import { StyleSheet } from 'react-native'
import SearchBar from 'search-bar-react'

const NavBar = ({ handleChange }) => {
    return (
        <div style={styles.navBar}>
            <SearchBar    
                onChange={handleChange}
                size='large'
                width='100%'
                placeholder='Search...'
                onClear={() => handleChange("")}
                />
        </div>
    )
}

const styles = StyleSheet.create({
    navBar: {
        position: "fixed",
        width: "100%"
    }
})

export default NavBar