import './search.css'
import React, { useEffect, useState } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';

function Search() {
    let baibao = JSON.parse(localStorage.getItem("1"));
    let [fire, setFire] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/tintuc')
            .then(response => response.json())
            .then(data => {
                setFire(data);
            })
            .catch(error => console.error(error));
    }, []);

    // tim kiem
    function hand(hie) {
        if (hie.key === "Enter") {
            fetch('http://localhost:3000/timkiem?tukhoa=' + hie.target.value)
                .then(response => response.json())
                .then(tintuc => {
                    setFire(tintuc);
                })
                .catch(error => console.error(error));
        }
    }

    function hand1() {
        let dian = document.getElementById('timkiem');
        fetch('http://localhost:3000/timkiem?tukhoa=' + dian.value)
            .then(response => response.json())
            .then(tintuc => {
                setFire(tintuc);
            })
            .catch(error => console.error(error));
    }
    let noiTu = "http://localhost:5173/detail/";
   

    return (
        <>
            <div class="cachxa"></div>
            <div class="cachxa"></div>
            <div class='row'>
                <div class='col-sm-2'></div>
                <div class='col-sm-8 kc'>
                    <h2 class='chutimkiem'>Tìm kiếm</h2>
                    <div class="cachxa"></div>
                    <div class="input-container">
                        <input type="text" onKeyUp={hand} id='timkiem' />
                        <span class="icon"><i class="fa-solid fa-magnifying-glass dichuotvao" onClick={hand1}></i></span>
                    </div>
                </div>
                <div class='col-sm-2'></div>
            </div>

            <div class="cachxa"></div>
            <div class="cachxa"></div>
            <div class="cachxa"></div>
            {fire.map((drama) => <div class="row" id={drama.ID} key={drama.ID}>
                <div class="col-sm-2"></div>
                <div class="col-sm-5 kc">
                    <a href={noiTu.concat(drama.ID)} class="chutheatimkiem">{drama.tieude}</a>
                    <div class="noidungtimkiem">{drama.noidung}</div>
                    <div class='ngaydangtimkiem'>{drama.ngaydang}</div>
                </div>
                <div class="col-sm-3">
                    <a href={noiTu.concat(drama.ID)}>
                        <img class="dodaianhtimkiem" src={drama.img} />
                    </a>
                </div>
                <div class="col-sm-2"></div>

                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8 kc">
                        <hr class='hrtimkiem' />
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>)}
        </>
    )

}

export default Search;