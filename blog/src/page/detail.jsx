import './search.css'
import React, { useEffect, useState } from 'react';
function Detail() {

    let [fire, setFire] = useState([]);
    let [tintuc, setTintuc] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/baigoiy')
            .then(response => response.json())
            .then(data => {
                setTintuc(data);
            })
            .catch(error => console.error(error));
        // hien thi theo link
        fetch('http://localhost:3000/chitiet?linkchitiet=' + window.location.href)
            .then(response => response.json())
            .then(chitiet => {
                setFire(chitiet);
            })
            .catch(error => console.error(error));
    }, []);
    let noiTu = "http://localhost:5173/detail/";



    return (
        <>
        <div class='cachxa'></div>
            <div class="row ">
                <div class="col-sm-1 "></div>
                <div class="col-sm-7 " key={fire.ID}>
                    <div class="khoangcachbaigoiy"></div>
                    <h3 class="tieudechitiet">{fire.tieude}</h3>
                    <div class='ngaydang1'>{fire.ngaydang}</div>
                    <div class="khoangcachbaigoiy"></div>
                    <div class="khoangcachbaigoiy"></div>
                    <img class="dodaianhchitiet" src={fire.img} />
                    <div class="khoangcachbaigoiy"></div>
                    <div class="khoangcachbaigoiy"></div>
                    <div class="khoangcachbaigoiy"></div>
                    <div class="noidungchitiet" dangerouslySetInnerHTML={{__html: fire.noidungchitiet}}></div>
                </div>
                <div class="col-sm-3">
                    {tintuc.map((drama) => <div class='baigoiy' key={drama.ID}>
                        <div class="khoangcachbaigoiy"></div>
                        <a href={noiTu.concat(drama.ID)} class="tieudebaigoiy">{drama.tieude}</a>
                        
                        <div class="chungdong1">
                            <a href={noiTu.concat(drama.ID)}>
                            <img class="anhbaigoiy" src={drama.img} />
                            </a>
                            <div class="noidungbaigoiy">{drama.noidung}</div>
                        </div>
                        <div class='cachxa'></div>
                    </div>)}
                </div>
                <div class="col-sm-1 "></div>
            </div>
        </>
    )
}
export default Detail;