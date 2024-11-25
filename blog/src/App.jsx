import { useEffect, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './page/login'
import Register from './page/register'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Search from './page/search'
import Home from './page/home'
import Post from './page/post'
import Detail from './page/detail'
import KiemTra from './page/kiemtra';
import Quanlytintuc from './page/quanlytintuc'
import Quanlydanhmuc from './page/quanlydanhmuc'
export default function App() {
	let [fire, setFire] = useState([]);
	let [banana, setBanana] = useState();
	let [fiz, setFiz] = useState();
	let [khonghien, setKhonghien] = useState();
	let [login, setLogin] = useState();
	useEffect(() => {

		fetch('http://localhost:3000/selectdanhmuc')
			.then(response => response.json())
			.then(data => {
				setFire(data);
			})
			.catch(error => console.error(error));

		fetch('http://localhost:3000/checkvar', {
			method: 'GET',
			credentials: 'include',
		})
			.then(response => response.json())
			.then(data => {
				setLogin(data);
				if (data) {
					if (data.quyen == 'admin') {
						setBanana(true);
						setFiz(true);
					} else {
						setBanana(true);
						setFiz(false);
					}
				}
			})
			.catch(error => console.error(error));

		if (window.location.href == "http://localhost:5173/login") {
			setKhonghien(true);
		} else {
			setKhonghien(false);
		}

	}, []);

	function dangxuat() {
		fetch('http://localhost:3000/dangxuat', {
			method: 'GET',
			credentials: 'include',
		})
			.then(response => response.text())
			.then(data => {
			})
			.catch(error => console.error(error));
		window.location.href = "http://localhost:5173/home";
		setBanana(false);
	}




	return (
		<>

			<br />
			<div class="all">
				{khonghien ? <div></div> :
					<div class="khungdanhmuc">

						<div>
							<div class="nav nav-tab" role="tablist">
								<li class="nav-item dieuhuong1">
									<a href="http://localhost:5173/home" class='nuthome'>
										<i class="fa-solid fa-house"></i>
									</a>
								</li>
								{fire.map((drama) => <li class="nav-item" key={drama.IDdanhmuc}>
									<a class="nav-link danhmuccha" data-toggle="tab" href={`http://localhost:5173/home/${drama.danhmuc}`}>{drama.danhmuchienthi}</a>
								</li>
								)}
								<li class="nav-item dieuhuong">
									<i class="fa-solid fa-bars"></i>
									<ul class="dropdown ">
										{fire.map((dc) => <li key={dc.IDdanhmuc}><a href={`http://localhost:5173/home/${dc.danhmuc}`} class="danhmuccon">{dc.danhmuchienthi}</a></li>)}
									</ul>
								</li>
								<div class='icontimkiem'>
									<a href="http://localhost:5173/search">
										<i class="fa-solid fa-magnifying-glass"></i>
									</a>
								</div>
								{banana ? <li class="nav-item anhdaidien1">
									<img src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s160x160&_nc_cat=1&ccb=1-7&_nc_sid=22ec41&_nc_ohc=atpU7uoQTskQ7kNvgEnNhCy&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AC1cZqXyIDgZJZ21nARRJvR&oh=00_AYC-o6xg0kl5v7Dt6nK08fZo3HJQ56YsNoERknho9miF5g&oe=6753D4FA" class="anhdaidien" />
									<ul class="dropdown1">
										<li><div class="danhmuccon">{login.taikhoan}</div></li>
										<li><a href="http://localhost:5173/post" class="danhmuccon">Đăng bài</a></li>
										{fiz ? <li><a href="http://localhost:5173/register" class="danhmuccon">Quản lý tài khoản</a></li> : <div></div>}
										<li><a href="http://localhost:5173/quanlytintuc" class="danhmuccon">Quản lý tin tức</a></li>
										<li><a href="http://localhost:5173/quanlydanhmuc" class="danhmuccon">Quản lý danh mục</a></li>
										<li><div class="danhmuccon" onClick={dangxuat}>Đăng xuất</div></li>
									</ul>
								</li> :
									<div class='dangnhap'>
										<a href='http://localhost:5173/login'>
											<img src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s160x160&_nc_cat=1&ccb=1-7&_nc_sid=22ec41&_nc_ohc=atpU7uoQTskQ7kNvgEnNhCy&_nc_zt=24&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AC1cZqXyIDgZJZ21nARRJvR&oh=00_AYC-o6xg0kl5v7Dt6nK08fZo3HJQ56YsNoERknho9miF5g&oe=6753D4FA" class="anhdaidienchuadangnhap" />
										</a>
										<a href='http://localhost:5173/login'>
											<div class='dangnhap1'>Đăng nhập</div>
										</a>
									</div>
								}

							</div>
						</div>
					</div>}

				<div class="container">
					<BrowserRouter>

						<Routes>
							<Route index element={<Home ></Home>} />
							<Route path="login" element={<Login />} />
							<Route path="register" element={
								<KiemTra>
									<Register />
								</KiemTra>
							} />
							<Route path="search" element={
								<KiemTra >
									<Search />
								</KiemTra>
							} />
							<Route path="home/*" element={
								<KiemTra>
									<Home />
								</KiemTra>
							} />
							<Route path="post/*" element={
								<KiemTra>
									<Post />
								</KiemTra>
							} />
							<Route path="detail/*" element={
								<KiemTra>
									<Detail />
								</KiemTra>}
							/>
							<Route path="quanlytintuc" element={
								<KiemTra >
									<Quanlytintuc />
								</KiemTra>
							} />
							<Route path="quanlydanhmuc" element={
								<KiemTra >
									<Quanlydanhmuc />
								</KiemTra>
							} />
						</Routes>
					</BrowserRouter>
				</div>
				{khonghien ? <div></div> : <hr />}

				{khonghien ? <div></div> :
					<div class=' container'>
						<div class='row'>
							<div class='col-sm-2'></div>
							<div class='col-sm-8 chungdong'>

								<div class='col-sm-3'>
									<div>
										<a class='chantrang' href="http://localhost:5173/home"><b>Trang chủ</b></a>
									</div>
								</div>
								<div class='col-sm-9 row'>
									{fire.map((chantrang) =>
										<div class='col-sm-4' key={chantrang.IDdanhmuc}>
											<a class='chantrang chuchantrang' href={`http://localhost:5173/home/${chantrang.danhmuc}`}>{chantrang.danhmuchienthi}</a>
											<div class='cachxa'></div>
										</div>)}
								</div>
							</div>
							<div class='col-sm-2'></div>
						</div>

						<div class='row'>
							<div class='col-sm-2'></div>
							<div class='col-sm-8'>
								<hr class='hrft1' />
							</div>
							<div class='col-sm-2'></div>
						</div>

						<div class='row'>
							<div class='col-sm-2'></div>
							<div class='col-sm-8 chungdong'>
								<div class='col-sm-4 cachright'>
									<div><b>Báo tiếng Việt</b></div>
									<div class='chuchantrang'>Thuộc Bộ Khoa học và Công nghệ</div>
									<div class='chuchantrang'>Số giấy phép: 548/GP ngày 24/08/2021</div>
								</div>
								<div class='col-sm-4 cachright'>
									<div class='chuchantrang'>Tổng biên tập: Nguyễn Phú Nam</div>
									<div class='chuchantrang'>Địa chỉ: Yên Nội, Đồng Quang, Quốc Oai, Hà Nội</div>
									<div class='chuchantrang'>Điện thoại: 0123456789</div>
								</div>
								<div class='col-sm-4'>
									<div class='chuchantrang cachleft'>© 2003-2024. Toàn bộ bản quyền thuộc Nguyễn Phú Nam</div>
								</div>
							</div>
							<div class='col-sm-2'></div>
						</div>

					</div>}
				<br />
			</div >
		</>
	)
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
//  root.render(<App />);
