import React from "react";

export default function Die(props){
    const value = props.value
    const isHeld = props.isHeld
    const classValue = `die-${value}`

    function paintDots() {
        if (value === 1){
            return (
                <div className="dot middle center"></div>
            )
        }

        if (value === 2){
            return (
                <>
                <div className="dot middle left"></div>
                <div className="dot middle right"></div>
                </>
            )
        }

        if (value === 3){
            return (
                <>
                <div className="dot middle left"></div>
                <div className="dot middle center"></div>
                <div className="dot middle right"></div>
                </>
            )
        }

        if (value === 4){
            return (
                <>
                <div className="dot top left"></div>
                <div className="dot bottom left"></div>
                <div className="dot top right"></div>
                <div className="dot bottom right"></div>
                </>
            )
        }

        if (value === 5){
            return (
                <>
                <div className="dot top left"></div>
                <div className="dot bottom left"></div>
                <div className="dot middle center"></div>
                <div className="dot top right"></div>
                <div className="dot bottom right"></div>
                </>
            )
        }

        if (value === 6){
            return (
                <>
                <div className="dot top left"></div>
                <div className="dot bottom left"></div>
                <div className="dot middle left"></div>
                <div className="dot top right"></div>
                <div className="dot bottom right"></div>
                <div className="dot middle right"></div>
                </>
            )
        }
}
    
    const getDotElements = paintDots()
    return(
        <div style={{backgroundColor: isHeld && "#59E391"}} className={classValue}
        onClick={props.clickFn}>
            {getDotElements}
        </div>
    )
}