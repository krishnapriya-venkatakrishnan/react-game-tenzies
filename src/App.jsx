import React, { useState, useEffect } from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){

    const [newDice, setNewDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [numOfRolls, setNumOfRolls] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const [bestTimeTaken, setBestTimeTaken] = useState(0)

    // localStorage.clear("tenzies-best-time")
    useEffect(()=> {
        setBestTimeTaken(getBestTimeTaken())
    }, [])

    useEffect(()=> {
        let timer
        if (!tenzies) {
            timer = setInterval(() => {
                setTimeTaken(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => {
            // if (timer) {
                clearInterval(timer);
            // }
        };
    }, [tenzies])

    useEffect(()=> {

        const allHeld = newDice.every(die => die.isHeld)
        const firstValue = newDice[0].value
        const allSameValue = newDice.every(die => die.value === firstValue)
        
        if (allHeld && allSameValue){
            if (!bestTimeTaken || timeTaken < bestTimeTaken)
                localStorage.setItem("tenzies-best-time", timeTaken)
            
            setTenzies(true)
        }

    }, [newDice])

    function getBestTimeTaken(){
        let bestTime = localStorage.getItem("tenzies-best-time") || 0
        bestTime = parseInt(bestTime, 10)
        return bestTime
    }

    function generateNewDie(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice(){
        const randomNumArr = []
        for(let i=0; i<10; i++){
            randomNumArr.push(
                generateNewDie()
            )
        }
        return randomNumArr
    }

    function clickDice(dieId){
        const updatedDice = newDice.map(die => {
            if (die.id === dieId){
                die.isHeld = !die.isHeld
            }
            return die
        })
        setNewDice(updatedDice)
    }

    const dieElements = newDice.map(die => {
        return <Die key={die.id} value={die.value} isHeld={die.isHeld} clickFn={() => clickDice(die.id)}/>
    })

    function rollDice(){
        
        if (tenzies){
            setNewDice(allNewDice())
            setTenzies(false)
            setNumOfRolls(0)
            setTimeTaken(0)
            setBestTimeTaken(getBestTimeTaken())
            return
        }

        setNumOfRolls(prevRolls => prevRolls+1)

        setNewDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die :
                generateNewDie()
        }))
    }

    function formatTime(time) {
        const hours = String(Math.floor(time / 3600)).padStart(2, '0')
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
        const seconds = String(time % 60).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <>
        {tenzies && <Confetti />}
        <main className="container">
            <div className="top-container">
                <div className="roll">
                    <p className="roll-que">Number of rolls: </p>
                    <p className="roll-ans">{numOfRolls}</p>
                </div>
                <div className="time">
                    <p className="time-ques">Time: </p>
                    <p className="time-ans">{formatTime(timeTaken)}</p>
                </div>
                <div className="best-time">
                    <p className="best-time-ques">Best time: </p>
                    <p className="best-time-ans">{formatTime(bestTimeTaken)}</p>
                </div>
            </div>
            <div className="details">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="die-container">
                {dieElements}
            </div>
            <button className="roll-btn"
            onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
        </>
    )
}