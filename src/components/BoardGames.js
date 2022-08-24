import React, { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import BoardGameModal from "./BoardGameModal"
import InfiniteScroll from 'react-infinite-scroll-component'

const BoardGames = ({ data, search }) => {
    let boardGameJsons = data.filter(g => search.toLowerCase() === g.name.slice(0,search.length).toLowerCase())
    let games = boardGameJsons.map(boardGameJson => 
        <BoardGame key={boardGameJson.id} boardGameJson={boardGameJson} />
    )

    const initialState = { limit: 20, items: games.slice(0, 50)}

    let [state, setState] = useState(initialState)
    useEffect(() => setState(initialState), [search])

    const fetchData = () => {
        setState({
            limit: state.limit += 20,
            items: games.slice(0, state.limit += 20)
        });
    };

    return (
        <InfiniteScroll
            dataLength={state.items.length} 
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={<p>Yay! You have seen it all</p>}
            >
            <div style={styles.boardGameContainer} >
                {state.items}
            </div>
        </InfiniteScroll>
    )
}

const BoardGame = ({ boardGameJson }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const name = boardGameJson["name"]
    const displayName = (name.length <= 21) ? boardGameJson["name"] : name.substring(0, 20) + ".."
    
    return (
        <div>
            <div style={styles.preview} onClick={toggleModal}>
                <img alt={boardGameJson["name"]} style={styles.gameImage} src={boardGameJson["image"]} />
                <div style={styles.displayName}>{displayName}</div>
            </div>
            <BoardGameModal boardGameJson={boardGameJson} modalVisible={modalVisible} toggleModal={toggleModal} />
        </div>
    )
}

const styles = StyleSheet.create({
    boardGameContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginTop: "16%",
        marginHorizontal: "8%",
        paddingVertical: "4%",
        paddingHorizontal: "5%",
        overflowY: "scroll"
    }, 
    preview: {
        flex: 0,
        height: "150px",
        width: "170px",
        alignItems: "center",
        textAlign: "center"
    },
    displayName: {
    },
    gameImage: {
        height: "100px",
        maxWidth: "130px",
        overflow: "hidden",
        width: "auto",
    }, 
})

export default BoardGames;