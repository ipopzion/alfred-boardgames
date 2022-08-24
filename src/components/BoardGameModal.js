import React, { useState, useEffect } from "react"
import { Modal, View, Text } from "react-native"
import boardGameService from './../services/boardGameService'

import ReactHtmlParser from 'react-html-parser'


const BoardGameModal = ({ boardGameJson, modalVisible, toggleModal }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onClick={toggleModal}
            >
            <BoardGameModalContent boardGameJson={boardGameJson} toggleModal={toggleModal} />
        </Modal>
    )
}

const BoardGameModalContent = ({ boardGameJson }) => {
    const gameId = boardGameJson.id

    const defaultUserData = {
        id: gameId, 
        favourite: false,
        own: false, 
        totalRating: 0, 
        numRating: 0, 
        memo: "", 
    }

    const [userData, setUserData] = useState(defaultUserData) 
    const [memoVisible, setMemoVisible] = useState(false)

    useEffect(() => {
        boardGameService
            .read(gameId)
            .then(data => { console.log(data)})
            .catch(error => {console.log(error)})
    }, [])

    const toggleMemoVisible = () => {
        setMemoVisible(!memoVisible)
    }

    return (
        <div style={styles.modalOverlay}>
            {memoVisible 
            ? <MemoPopUp userData={userData} setUserData={setUserData} toggleMemoVisible={toggleMemoVisible} memoVisible={memoVisible} />
            : <ContentPopUp boardGameJson={boardGameJson} userData={userData} setUserData={setUserData} toggleMemoVisible={toggleMemoVisible} />
            }
        </div>
    )
}

const ContentPopUp = ({ boardGameJson, userData, setUserData, toggleMemoVisible }) => {
    return (
        <div style={styles.modalMain} onClick={(e) => e.stopPropagation()}>
            <View style={styles.modalNameHolder}>
                <Text style={styles.modalName}>{boardGameJson["name"]}</Text>
            </View>
            <View style={styles.modalImageHolder}>
                <img alt={boardGameJson["name"]} style={styles.modalImage} src={boardGameJson["image"]} />
            </View>
            <View style={styles.description}>
                <Text>
                    {ReactHtmlParser(boardGameJson["description"])}
                </Text>
            </View>
            <BoardGameButtonHolder userData={userData} setUserData={setUserData} toggleMemoVisible={toggleMemoVisible} />
        </div>
    )
}

const BoardGameButtonHolder = ({ userData, setUserData, toggleMemoVisible }) => {
    const [memo, setMemo] = useState(userData.memo)
    const [like, setLike] = useState(userData.favourite)
    const [own, setOwn] = useState(userData.own)

    const handleLike = () => {
        const newUserData = userData
        newUserData.favourite = !userData.favourite
        setLike(newUserData.favourite)
        setUserData(newUserData)
    }

    const handleOwn = () => {
        const newUserData = userData
        newUserData.own = !userData.own
        setOwn(newUserData.own)
        setUserData(newUserData)
    }

    const handleMemo = () => {
        toggleMemoVisible()
    }

    return (
        <div style={styles.buttonHolder}>
            <ModalButton 
                text={["Own", "Owned"]} 
                handleClick={handleOwn} 
                activated={own} 
                />
            <ModalButton 
                text={["Write Memo", "Memo"]} 
                handleClick={handleMemo} 
                activated={memo} 
                />
            <ModalButton 
                text={["Like", "Liked"]} 
                handleClick={handleLike} 
                activated={like} 
                />
        </div>
    )
}

const ModalButton = ({ text, handleClick, activated }) => {
    return (
        <div 
            style={activated ? styles.buttonClicked : styles.buttonNotClicked}
            onClick={handleClick} 
            >
            <p>{(activated) ? text[1] : text[0]}</p>
        </div>
    )
}

const MemoPopUp = ({ userData, setUserData, toggleMemoVisible, memoVisible }) => {

    const [newMemo, setNewMemo] = useState(userData.memo)

    const handleClose = (e) => {
        const newUserData = userData
        newUserData.memo = newMemo
        setUserData(newUserData)
        toggleMemoVisible()
        console.log(newMemo)
    }

    return (
        <div style={{...styles.memoPopUp, ...memoVisible ? {} : {display: "none"}}} onClick={(e) => e.stopPropagation()}>
            <div 
                autoFocus contentEditable suppressContentEditableWarning
                style={styles.memoInput} 
                onInput={(e) => setNewMemo(e.currentTarget.textContent)}
                >
                    {userData.memo}
            </div>
            <div 
                style={{...styles.buttonHolder, ...styles.closeButton}} 
                onClick={handleClose}
                >
                <p>Save</p>
            </div>
        </div>
    )
}

const styles = {
    modalOverlay: {
        height: "100%",
        width: "100%", 
        top: 0, 
        position: "absolute", 
    }, 
    modalMain: {
        top: "15%",
        position: "relative",
        alignItems: "center",   
        margin: "0 auto",
        padding: 0,
        backgroundColor: "rgb(250, 248, 245)",
        border: "1px solid rgb(111, 109, 106)",
        borderRadius: "2%",
        width: "90%",
        height: "70%"
    }, 
    modalNameHolder: {
        backgroundColor: "rgb(201, 192, 177)",
        height: "10%",
        textAlign: "center",
        justifyContent: "center"
    },
    modalName: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "24px",
        fontWeight: "bold",
    },
    modalImageHolder: {
        height: "25%",
        alignSelf: "center",
        marginBottom: "5px"
    },
    modalImage: {
        objectFit: "cover",
        height: "100%",
        width: "auto",
    },
    description: {
        height: "50%",
        overflowY: "scroll",
        fontFamily: "'Roboto', sans-serif",
        paddingHorizontal: 20,
    }, 
    buttonHolder: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: "0px",
        height: "10%",
        width: "100%"
    }, 
    buttonClicked: {
        backgroundColor: "rgb(201, 192, 177)",
        flex: 1/3,
        borderWidth: 0,
        fontFamily: "'Roboto', sans-serif",
        fontSize: "18px",
        textAlign: "center",
    },
    buttonNotClicked: {
        backgroundColor: "rgb(232, 225, 213)",
        flex: 1/3,
        borderWidth: 0,
        fontFamily: "'Roboto', sans-serif",
        fontSize: "18px",
        textAlign: "center",
    }, 
    memoInput: {
        height: "90%"
    }, 
    closeButton: {
        backgroundColor: "rgb(177, 194, 201)",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
        fontSize: "18px",
    },
    memoPopUp: {
        top: "15%",
        position: "relative",
        margin: "0 auto",
        padding: 0,
        backgroundColor: "rgb(250, 248, 245)",
        border: "1px solid rgb(111, 109, 106)",
        borderRadius: "2%",
        width: "90%",
        height: "70%",
    },
}

export default BoardGameModal