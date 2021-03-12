module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 615:
/***/ ((module) => {

// Checks API example
// See: https://developer.github.com/v3/checks/ to learn more

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.onAny(async (context) => {
    context.log.info({ event: context.name, action: context.payload.action });
  });

  app.on("issues.opened", async (context) => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   { owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World! }
    const params = context.issue({ body: "Hello World!" });

    // Post a comment on the issue
    return context.octokit.issues.createComment(params);
  });

  app.on("issues.reopened", async (context) => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   { owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World! }
    const params = context.issue({ body: "Hello World! 123" });

    // Post a comment on the issue
    return context.octokit.issues.createComment(params);
  });

  app.on(["check_suite.requested", "check_run.rerequested"], check);

  async function check(context) {
    const startTime = new Date();

    // Do stuff
    const {
      head_branch: headBranch,
      head_sha: headSha,
    } = context.payload.check_suite;
    // Probot API note: context.repo() => {username: 'hiimbex', repo: 'testing-things'}
    return context.octokit.checks.create(
      context.repo({
        name: "My app!",
        head_branch: headBranch,
        head_sha: headSha,
        status: "completed",
        started_at: startTime,
        conclusion: "success",
        completed_at: new Date(),
        output: {
          title: "Probot check!",
          summary: "The check has passed!",
        },
      })
    );
  }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};


/***/ }),

/***/ 179:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

const { run } = __nccwpck_require__(785)
const app = __nccwpck_require__(615);

run(app).catch((error) => {
  console.error(error);
  process.exit(1);
});

/***/ }),

/***/ 785:
/***/ ((module) => {

module.exports = eval("require")("@probot/adapter-github-actions");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(179);
/******/ })()
;