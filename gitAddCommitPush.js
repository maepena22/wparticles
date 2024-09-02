const { exec } = require('child_process');
const path = require('path');

/**
 * Function to add, commit, and push changes in the target Git repository.
 * 
 * @param {string} repoPath - The absolute path to the Git repository.
 * @param {string} commitMessage - The commit message for the changes.
 * @param {function} [callback] - Optional callback function to handle success or error.
 */
function gitAddCommitPush(repoPath, commitMessage, callback) {
    const repoAbsolutePath = path.resolve(repoPath);

    // Add all changes to the staging area
    exec(`cd "${repoAbsolutePath}" && git add .`, (err, stdout, stderr) => {
        if (err) {
            console.error('Error adding files to git:', stderr);
            if (callback) callback(err);
            return;
        }
        console.log('All files added to git.');

        // Commit the changes
        exec(`cd "${repoAbsolutePath}" && git commit -m "${commitMessage}"`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error committing changes:', stderr);
                if (callback) callback(err);
                return;
            }
            console.log('Changes committed.');

            // Push the changes
            exec(`cd "${repoAbsolutePath}" && git push`, (err, stdout, stderr) => {
                if (err) {
                    console.error('Error pushing changes:', stderr);
                    if (callback) callback(err);
                    return;
                }
                console.log('Changes pushed.');
                if (callback) callback(null);
            });
        });
    });
}

module.exports = gitAddCommitPush;
