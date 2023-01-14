import React from 'react';
import { useState, Fragment } from 'react';
// import { DataDesktop14 } from "./DataDesktop14";
import AboutSection from "./AboutSection";
import "./desktop14.css";
import { Button } from '@mui/material';
import Rounds from './Rounds/rounds';

function ResultsSection(props) {
    const [dataDesktop, setDataDesktop] = useState(props.DataDesktop14[props.id].rndCmpltd);
    console.log(dataDesktop);
    const cArr = Array(dataDesktop).fill(0);
    // const arr = Array(3).fill('a');
    // const cArr(dataDesktop);
    // for (let index = 0; index < dataDesktop; index++) {const cArr[index] = index+1;}
    const [arr, setArr] = useState(cArr);
    const [roundNo, setRoundNo] = useState(1);
    const roundChangeBtnClickHandler = (e) => {
        setRoundNo(e.target.attributes.btnId.value);
        // console.log(e.target.attributes.btnId.value);
    }
    // $('.rdBtn').on('click', function () {
    //     var $el = $(this);
    //     return $el.data('btnId');
    //     console.log($el.data('id'), $el.data('option'));
    // });
    return (
        <div className="resultsSection">
            <div className="upper">
                <div className="rounds-part">
                    {arr.map((e, idx) => {
                        return <Button btnId={Number(idx + 1)} className='rdBtn' onClick={(e) => { roundChangeBtnClickHandler(e) }} variant="outlined">Round {idx + 1}</Button>
                    })}
                    {/* <Button variant="outlined">Round 1</Button>
                    <Button variant="outlined">Round 2</Button>
                    <Button variant="outlined">Round 3</Button>
                    <Button variant="outlined">Round 4</Button> */}
                </div>
                <div className="btn-part-resultsSec">

                </div>
            </div>
            <div className="lower">
                <Rounds dt={props.DataDesktop14} id={props.id} setDataDesktop={setDataDesktop} dataDesktop={dataDesktop} rd={roundNo} setRd={setRoundNo} />
            </div>
        </div>
    )
}

export default ResultsSection