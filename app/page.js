import Image from "next/image";
import Header from "./components/Header";
import List from './components/List'
export default function Home() {
	return (
		<div className="home">
			<Header />
			<div className="content">
				<List type={'trending'} title={'Thịnh hành'}/>
				<List type={'upcoming'} title={'Sắp chiếu'}/>
				<List type={'random'} title={'Phim ngẫu nhiên'}/>
			</div>	
		</div>
	);
}
