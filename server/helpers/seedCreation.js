const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://neo4j:cake@neo4j:7474');
const bluebird = require('bluebird');

var female = ['PATRICIA','LINDA','BARBARA','ELIZABETH','JENNIFER','MARIA','SUSAN','MARGARET','DOROTHY','LISA','NANCY','KAREN','BETTY','HELEN','SANDRA','DONNA','CAROL','RUTH','SHARON','MICHELLE','LAURA','SARAH','KIMBERLY','DEBORAH','JESSICA','SHIRLEY','CYNTHIA','ANGELA','MELISSA','BRENDA','AMY','ANNA','REBECCA','VIRGINIA','KATHLEEN','PAMELA','MARTHA','DEBRA','AMANDA','STEPHANIE','CAROLYN','CHRISTINE','MARIE','JANET','CATHERINE','FRANCES','ANN','JOYCE','DIANE','ALICE','JULIE','HEATHER','TERESA','DORIS','GLORIA','EVELYN','JEAN','CHERYL','MILDRED','KATHERINE','JOAN','ASHLEY','JUDITH','ROSE','JANICE','KELLY','NICOLE','JUDY','CHRISTINA','KATHY','THERESA','BEVERLY','DENISE','TAMMY','IRENE','JANE','LORI','RACHEL','MARILYN','ANDREA','KATHRYN','LOUISE','SARA','ANNE','JACQUELINE','WANDA','BONNIE','JULIA','RUBY','LOIS','TINA','PHYLLIS','NORMA','PAULA','DIANA','ANNIE','LILLIAN','EMILY','ROBIN','PEGGY','CRYSTAL','GLADYS','RITA','DAWN','CONNIE','FLORENCE','TRACY','EDNA','TIFFANY','CARMEN','ROSA','CINDY','GRACE','WENDY','VICTORIA','EDITH','KIM','SHERRY','SYLVIA','JOSEPHINE','THELMA','SHANNON','SHEILA','ETHEL','ELLEN','ELAINE','MARJORIE','CARRIE','CHARLOTTE','MONICA','ESTHER','PAULINE','EMMA','JUANITA','ANITA','RHONDA','HAZEL','AMBER','EVA','DEBBIE','APRIL','LESLIE','CLARA','LUCILLE','JAMIE','JOANNE','ELEANOR','VALERIE','DANIELLE','MEGAN','ALICIA','SUZANNE','MICHELE','GAIL','BERTHA','DARLENE','VERONICA','JILL','ERIN','GERALDINE','LAUREN','CATHY','JOANN','LORRAINE','LYNN','SALLY','REGINA','ERICA','BEATRICE','DOLORES','BERNICE','AUDREY','YVONNE','ANNETTE','JUNE','SAMANTHA','MARION','DANA','STACY','ANA','RENEE','IDA','VIVIAN','ROBERTA','HOLLY','BRITTANY','MELANIE','LORETTA','YOLANDA','JEANETTE','LAURIE','KATIE','KRISTEN','VANESSA','ALMA','SUE','ELSIE','BETH','JEANNE','VICKI','CARLA','TARA','ROSEMARY','EILEEN','TERRI','GERTRUDE','LUCY','TONYA','ELLA','STACEY','WILMA','GINA','KRISTIN','JESSIE','NATALIE','AGNES','VERA','WILLIE','CHARLENE','BESSIE','DELORES','MELINDA','PEARL','ARLENE','MAUREEN','COLLEEN','ALLISON','TAMARA','JOY','GEORGIA','CONSTANCE','LILLIE','CLAUDIA','JACKIE','MARCIA','TANYA','NELLIE','MINNIE','MARLENE','HEIDI','GLENDA','LYDIA','VIOLA','COURTNEY','MARIAN','STELLA','CAROLINE','DORA','JO','VICKIE','MATTIE','TERRY','MAXINE','IRMA','MABEL','MARSHA','MYRTLE','LENA','CHRISTY','DEANNA','PATSY','HILDA','GWENDOLYN','JENNIE','NORA','MARGIE','NINA','CASSANDRA','LEAH','PENNY','KAY','PRISCILLA','NAOMI','CAROLE','BRANDY','OLGA','BILLIE','DIANNE','TRACEY','LEONA','JENNY','FELICIA','SONIA','MIRIAM','VELMA','BECKY','BOBBIE','VIOLET','KRISTINA','TONI','MISTY','MAE','SHELLY','DAISY','RAMONA','SHERRI','ERIKA','KATRINA','CLAIRE','LINDSEY'];
var male = ['CHARLIE','TYLER','GILBERT','GENE','MARC','REGINALD','RUBEN','BRETT','ANGEL','NATHANIEL','RAFAEL','LESLIE','EDGAR','MILTON','RAUL','BEN','CHESTER','CECIL','DUANE','FRANKLIN','ANDRE','ELMER','BRAD','GABRIEL','RON','MITCHELL','ROLAND','ARNOLD','HARVEY','JARED','ADRIAN','KARL','CORY','CLAUDE','ERIK','DARRYL','JAMIE','NEIL','JESSIE','CHRISTIAN','JAVIER','FERNANDO','CLINTON','TED','MATHEW','TYRONE','DARREN','LONNIE','LANCE','CODY','JULIO','KELLY','KURT','ALLAN','NELSON','GUY','CLAYTON','HUGH','MAX','DWAYNE','DWIGHT','ARMANDO','FELIX','JIMMIE','EVERETT','JORDAN','IAN','WALLACE','KEN','BOB','JAIME','CASEY','ALFREDO','ALBERTO','DAVE','IVAN','JOHNNIE','SIDNEY','BYRON','JULIAN','ISAAC','MORRIS','CLIFTON','WILLARD','DARYL','ROSS','VIRGIL','ANDY','MARSHALL','SALVADOR','PERRY','KIRK','SERGIO','MARION','TRACY','SETH','KENT','TERRANCE','RENE','EDUARDO','TERRENCE','ENRIQUE','FREDDIE','WADE','AUSTIN','STUART','FREDRICK','ARTURO','ALEJANDRO','JACKIE','JOEY','NICK','LUTHER','WENDELL','JEREMIAH','EVAN','JULIUS','DANA','DONNIE','OTIS','SHANNON','TREVOR','OLIVER','LUKE','HOMER','GERARD','DOUG','KENNY','HUBERT','ANGELO','SHAUN','LYLE','MATT','LYNN','ALFONSO','ORLANDO','REX','CARLTON','ERNESTO','CAMERON','NEAL','PABLO','LORENZO','OMAR','WILBUR','BLAKE','GRANT','HORACE','RODERICK','KERRY','ABRAHAM','WILLIS','RICKEY','JEAN','IRA','ANDRES','CESAR','JOHNATHAN','MALCOLM','RUDOLPH','DAMON','KELVIN','RUDY','PRESTON','ALTON','ARCHIE','MARCO','WM','PETE','RANDOLPH','GARRY','GEOFFREY','JONATHON','FELIPE','BENNIE','GERARDO','ED','DOMINIC','ROBIN','LOREN','DELBERT','COLIN','GUILLERMO','EARNEST','LUCAS','BENNY','NOEL','SPENCER','RODOLFO','MYRON','EDMUND','GARRETT','SALVATORE','CEDRIC','LOWELL','GREGG','SHERMAN','WILSON','DEVIN','SYLVESTER','KIM','ROOSEVELT','ISRAEL','JERMAINE','FORREST','WILBERT','LELAND','SIMON','GUADALUPE','CLARK','IRVING','CARROLL','BRYANT','OWEN','RUFUS','WOODROW','SAMMY','KRISTOPHER','MACK','LEVI','MARCOS','GUSTAVO','JAKE','LIONEL','MARTY','TAYLOR','ELLIS','DALLAS','GILBERTO','CLINT','NICOLAS','LAURENCE','ISMAEL','ORVILLE','DREW','JODY','ERVIN','DEWEY','AL','WILFRED','JOSH','HUGO','IGNACIO','CALEB','TOMAS','SHELDON','ERICK','FRANKIE','STEWART','DOYLE','DARREL','ROGELIO','TERENCE','SANTIAGO','ALONZO','ELIAS','BERT','ELBERT','RAMIRO','CONRAD','PAT','NOAH','GRADY','PHIL','CORNELIUS','LAMAR','ROLANDO','CLAY','PERCY','DEXTER','BRADFORD','MERLE','DARIN','AMOS','TERRELL','MOSES','IRVIN','SAUL','ROMAN','DARNELL','RANDAL','TOMMIE','TIMMY','DARRIN','WINSTON','BRENDAN','TOBY','VAN','ABEL','DOMINICK','BOYD','COURTNEY','JAN','EMILIO','ELIJAH','CARY','DOMINGO','SANTOS','AUBREY','EMMETT'];
var queryForNames = "curl http://deron.meranda.us/data/census-dist-female-first.txt |    awk '{print $1}'"
var subreddits = ['streetart', 'sanfrancisco', 'jokes', 'malefashionadvice', 'rage', 'MorbidReality', 'cringe', 'nostalgia', 'aww', 'showerthoughts', 'funny', 'LifeProTips', 'PacificCrestTrail', 'EvolveSustain', 'glutenfree', 'dadjokes', 'photography', 'Cricket', 'glutenfree', 'gaming', 'DaftPunk', 'facepalm', 'MapPorn', 'tattoos', 'lifehacks'];
var subredditLength = subreddits.length;
var photo = 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png';
var newFemale = [];
var newMale = [];

// MAKE LIST OF FEMALE USERS
female.forEach(function(name, index) {
	index = index + 10;
	if (index % 13 === 0) {
		preference = 'woman';
	} else if (index % 100 === 0) {
		preference = 'both';
	} else {
		preference = 'man';
	}

	var subs = [];

	for (var i = 0; i < 3; i++) {
		subs.push({name: subreddits[Math.floor(Math.random() * subredditLength)]});
	}

	var obj = {
		redditId: index.toString(),
		name: name,
		photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
		gender: 'woman',
		preference: preference,
		subs: subs
	}

	newFemale.push(obj);

})

var numOfWomen = newFemale.length;

// MAKE LIST OF MALE USERS
male.forEach(function(name, index) {
	index = index + numOfWomen;
	if (index % 13 === 0) {
		preference = 'man';
	} else if (index % 100 === 0) {
		preference = 'both';
	} else {
		preference = 'woman';
	}

	var subs = [];

	for (var i = 0; i < 3; i++) {
		subs.push({name: subreddits[Math.floor(Math.random() * subredditLength)]});
	}

	var obj = {
		redditId: index.toString(),
		name: name,
		photo: 'https://cdn1.iconfinder.com/data/icons/simple-icons/4096/reddit-4096-black.png',
		gender: 'man',
		preference: preference,
		subs: subs
	}

	newMale.push(obj);

})

var everyone = newFemale.concat(newMale);
var everyoneLength = everyone.length - 1;

// console.log(everyone);

const savePerson = (person) => (
  // var newObj = {
  //   sub1: person.subs[0].name,
  //   sub2: person.subs,
  //   sub3: person.subs,
  // }
  // console.log(newObj);
  new Promise((resolve, reject) => {
    db.cypher({
      query: 'MERGE (user:Person { redditId: {redditId}, type: "fake" }) \
      ON CREATE SET user.name = {username} \
      ON CREATE SET user.redditId = {redditId} \
      ON CREATE SET user.photo = {photo} \
      ON CREATE SET user.gender = {gender} \
      ON CREATE SET user.preference = {preference} \
			MERGE (s1:Subreddit { name: {sub1}}) \
			MERGE (s2:Subreddit { name: {sub2}}) \
			MERGE (s3:Subreddit { name: {sub3}}) \
			MERGE (user)-[:FOLLOWS]->(s1) \
			MERGE (user)-[:FOLLOWS]->(s2) \
			MERGE (user)-[:FOLLOWS]->(s3) \
      RETURN user, s1, s2, s3;',
      params: {
      	redditId: person.redditId,
        username: person.name,
        photo: person.photo,
        gender: person.gender,
        preference: person.preference,
        sub1: person.subs[0].name,
        sub2: person.subs[1].name,
        sub3: person.subs[2].name,
      },
    }, (err, newPerson) => {
      if (err) {
        console.log('server/userController.js 74: error');
        reject(err);
      } else {
				console.log('30149832714093287410978234017234', newPerson[0])
        resolve('next');
      }
    });
  })
);

const recursiveAdd = (allPeople) => {
	// console.log(allPeople[0])
	savePerson(allPeople[0])
	.then(function() {
		if (allPeople.length === 1) {
			return;
		} else {
			// console.log('hey');
			recursiveAdd(allPeople.slice(1));
		}
	})
};

recursiveAdd(everyone);

// setTimeout(() => {recursiveAdd(everyone)}, 5000);
