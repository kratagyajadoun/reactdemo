// import {
//     Card,
//     CardBody,
//     CardTitle,
//     CardText,
//     CardImg,
// } from "reactstrap";

// const ProjectCard=(props)=>{

//     const {imgAltText,imgSrcUrl,cardTitle,description}=props
//     return (
//     <Card>
//         <CardImg
//       alt={imgAltText}
//       src={imgSrcUrl}
//       top
//       style={
//           {
//               width:"20%",
//               height:"20%",
//           }
//       }
//     />


//     <CardBody>
//       <CardTitle tag="h5">
//         {cardTitle}
//       </CardTitle>
//       <CardText>
//           {description}
//         </CardText>
      
//     </CardBody>
//   </Card>
//     );
// };


// export default ProjectCard;







import { useEffect,useState } from "react";
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";

const ProjectCard = (props) => {
	//const { imgAltText, imgSrcUrl, cardTitle, description } = props;
	const [users, setUsers] = useState("");
	const f = async () => {
		const res = await fetch("https://reqres.in/api/users/");
		const json = await res.json();
		setUsers(json.data);
	};
	useEffect(() => {
		f();
	}, []);
	return (
		<Card className="text-center">
			{users.length &&
				users.map((user) => {
					return (
						<div key={user.id}>
							<CardImg
								alt={user.avatar}
								src={user.avatar}
								top
								style={{
									width: "20%",
									height: "20%",
								}}
							/>
							<CardBody>
								<CardTitle tag="h5">{user.first_name}</CardTitle>

								<CardText>{user.email}</CardText>
							</CardBody>
							
						</div>
					);
				})}

			
		</Card>
	);
};

export default ProjectCard;