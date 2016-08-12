MATCH (user:Person)-[r:INTERESTED_IN]->(subreddit)<-[:INTERESTED_IN]-(potential:Person) WHERE user.name = 'Neil'
MERGE (user)<-[:POTENTIAL]->(potential)
RETURN user, potential, r;

MATCH (n:Person) WHERE n.name="neil_white" return n.accessToken;








