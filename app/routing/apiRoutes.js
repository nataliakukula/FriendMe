const friends = require("../data/friends");

module.exports = app => {

    app.get("/api/friends", (req, res) => {
        // send back the friends json
        res.json(friends);
    });

    app.post("/api/friends", (req, res) => {

        console.log("Backend data:", req.body);

        // Determine the user's most compatible friend using the following as a guide:
        let yourScore = req.body.score;

        // Convert each user's results into a simple array of numbers:       
        // const scoreNums = yourScore.map(x => +x); // Math.abs() recognizes the num-sting as a number

        let perfectMatchIndex = 0; // Need a starting index of the element
        let maximumDifference = 40; // Need a 'maximum' possible difference that represence the worst match

        // Check the total differences of all posible matches against the user -> Math.abs() get the absolute value of a number
        for (let i = 0; i < friends.length; i++) {
            let totalDifference = 0;
            // TODO error - cannot read length of undefined
            for (let j = 0; j < friends[i].scores.length; j++) {
                let difference = Math.abs(yourScore[j] - friends[i].scores[j]);
                totalDifference += difference;
            }
            // console.log("total difference:", totalDifference);

            // If there is a lower minimum - change the index, if not keep it as is
            if (totalDifference < maximumDifference) {
                perfectMatchIndex = i;
                maximumDifference = totalDifference;
            }
        }

        // console.log("index: ", perfectMatchIndex);

        // Send back to browser the best friend match
        res.json(friends[perfectMatchIndex]);

        // Add user to friend array:
        friends.push(req.body);
    });
};