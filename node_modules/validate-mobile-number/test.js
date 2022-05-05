const { formatPhoneNumber, validatePhoneNumber } = require("./dist");

// FAKE NUMBERS GENERATED ONLINE
[
    {
        mobile: "1 (960) 447-2728",
    },
    {
        mobile: "1 (966) 496-2774",
    },
    {
        mobile: "1 (830) 400-2088",
    },
    {
        mobile: "1 (958) 526-3802",
    },
    {
        mobile: "1 (965) 529-2774",
    },
    {
        mobile: "1 (977) 567-2466",
    },
    {
        mobile: "1 (923) 491-3262",
    },
    {
        mobile: "1 (969) 401-2227",
    },
    {
        mobile: "1 (980) 445-3383",
    },
    {
        mobile: "1 (979) 454-2718",
    },
    {
        mobile: "1 (973) 526-2649",
    },
    {
        mobile: "1 (959) 453-3354",
    },
    {
        mobile: "1 (852) 481-3687",
    },
    {
        mobile: "1 (868) 461-3985",
    },
    {
        mobile: "1 (824) 415-2813",
    },
    {
        mobile: "1 (874) 528-2698",
    },
    {
        mobile: "1 (862) 488-3672",
    },
    {
        mobile: "1 (898) 506-3848",
    },
    {
        mobile: "1 (956) 419-2389",
    },
    {
        mobile: "1 (886) 450-3426",
    },
    {
        mobile: "1 (969) 509-2245",
    },
    {
        mobile: "1 (869) 483-2159",
    },
    {
        mobile: "1 (872) 552-2956",
    },
    {
        mobile: "1 (841) 528-3343",
    },
    {
        mobile: "1 (854) 574-3453",
    },
    {
        mobile: "1 (967) 498-2545",
    },
    {
        mobile: "1 (805) 592-3613",
    },
    {
        mobile: "1 (892) 540-3433",
    },
].map(({ mobile }) => {
    console.log(validatePhoneNumber(`+${mobile}`), formatPhoneNumber(`+${mobile}`));
    console.log(validatePhoneNumber(`00${mobile}`), formatPhoneNumber(`00${mobile}`));
});
