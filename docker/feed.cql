-- Any Cypher commands in this file will be
-- run when the database initializes.


-- CREATE clause to create data
-- () parenthesis to indicate a node
-- ee:Person a variable 'ee' and label 'Person' for the new node
-- {} brackets to add properties to the node


CREATE (tb:Person { name: "Tyler", from: "Los Angeles" });
CREATE (cc:Person { name: "Christine", from: "San Francisco" });
CREATE (jc:Person { name: "Jen", from: "Cupertino" });
CREATE (nw:Person { name: "Neil", from: "New York" });

CREATE (:Subreddit { subreddit: "aww" });
CREATE (:Subreddit { subreddit: "JusticePorn" });
CREATE (:Subreddit { subreddit: "MorbidReality" });
CREATE (:Subreddit { subreddit: "fatpeoplestories" });

-- Neil and Tyler are both interested in fatpeoplestories subreddit
-- Tyler, Neil and Jen are  interested in aww subreddit

MATCH (n:Person {name:"Tyler"})
MERGE (s:Subreddit {subreddit:"aww"})
MERGE (n)-[r:INTERESTED_IN {alias: ['aww']} ]->(s)
RETURN  n,r, s;

MATCH (n:Person {name:"Neil"})
MERGE (s:Subreddit {subreddit:"aww"})
MERGE (n)-[r:INTERESTED_IN {alias: ['aww']} ]->(s)
RETURN  n,r, s;

MATCH (n:Person {name:"Jen"})
MERGE (s:Subreddit {subreddit:"aww"})
MERGE (n)-[r:INTERESTED_IN {alias: ['aww']} ]->(s)
RETURN  n,r, s;

MATCH (n:Person {name:"Christine"})
MERGE (s:Subreddit {subreddit:"JusticePorn"})
MERGE (n)-[r:INTERESTED_IN {alias: ['JusticePorn']} ]->(s)
RETURN  n,r, s;

MATCH (n:Person {name:"Jen"})
MERGE (s:Subreddit {subreddit:"MorbidReality"})
MERGE (n)-[r:INTERESTED_IN {alias: ['MorbidReality']} ]->(s)
RETURN  n,r, s;

MATCH (n:Person {name:"Neil"})
MERGE (s:Subreddit {subreddit:"fatpeoplestories"})
MERGE (n)-[r:INTERESTED_IN {alias: ['fatpeoplestories']} ]->(s)
RETURN  n,r, s;

MATCH (n:Person {name:"Tyler"})
MERGE (s:Subreddit {subreddit:"fatpeoplestories"})
MERGE (n)-[r:INTERESTED_IN {alias: ['fatpeoplestories']} ]->(s)
RETURN  n,r, s;
