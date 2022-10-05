import './rec_table.css'

function RecTable() {
    const data = [
        { name: "Robert", age: 23, gender: "Male", designation: "Full Stack(React + Java) Developer" },
        { name: "Michal", age: 24, gender: "Male", designation: "Full Stack Engineer" },
        { name: "Morgan", age: 24, gender: "Female", designation: "React Developer" },
        { name: "Tom", age: 26, gender: "Male", designation: "Front End Developer" },
        { name: "Steve", age: 27, gender: "Female", designation: "UI/UX Designer" }
      ]

    

  return (
    <div class="container">
  <div class="row">
    <div class="col-12">
		<table class="table table-image">
		  <thead>
		    <tr>
		      <th scope="col">Image</th>
		      <th scope="col">Movie</th>
		      <th scope="col">Year</th>
		      <th scope="col">Genre</th>
		    </tr>
		  </thead>
		  <tbody>
          {
            data.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.name}</td>
                  <td>{value.age}</td>
                  <td>{value.gender}</td>
                  <td>{value.designation}</td>
                </tr>
              )
            })
          }
        </tbody>
		</table>   
    </div>
  </div>
</div>
  );
}

export default RecTable;