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


-- MATCH (tb:Person) WHERE tb.name = "Tyler"
-- CREATE (js:Person { name: "Johan", from: "Sweden", learn: "surfing" }),
-- (ir:Person { name: "Ian", from: "England", title: "author" }),
-- (rvb:Person { name: "Rik", from: "Belgium", pet: "Orval" }),
-- (ally:Person { name: "Allison", from: "California", hobby: "surfing" }),
-- (ee)-[:KNOWS {since: 2001}]->(js),(ee)-[:KNOWS {rating: 5}]->(ir),
-- (js)-[:KNOWS]->(ir),(js)-[:KNOWS]->(rvb),
-- (ir)-[:KNOWS]->(js),(ir)-[:KNOWS]->(ally),
-- (rvb)-[:KNOWS]->(ally)


-- Find Node representing Emil
-- MATCH (ee:Person) WHERE ee.name = "Emil" RETURN ee;