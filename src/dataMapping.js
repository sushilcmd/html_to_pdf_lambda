const get_hh_mm = (clocks) => {
    let IN = parseInt(clocks.IN);
    let OUT = parseInt(clocks.OUT);

    if (IN != NaN) {
        IN = (IN / 100).toString().split(".").join(":")
    }
    if (OUT != NaN) {
        OUT = (OUT / 100).toString().split(".").join(":")
    }
    return { IN, OUT }
}

exports.data_mapping = (data) => {

    let label = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    let total_hours = {};
    let linesCount = 0

    const days = data.WEEK.DAYS;
    days.map(ele => {
        let lines = ele.REP_DATE.LINES
        total_hours[ele.REP_DATE.DAY] = ele.REP_DATE.TOTAL_DAY_HOURS
        if (lines.length > linesCount) {
            linesCount = lines.length;
        }
    })
    let finalArray = []

    for (let i = 0; i < linesCount; i++) {
        let row = {
            label: `row ${i}`,
            col: []
        }

        for (let j = 0; j < label.length; j++) {
            let currentDay = label[j].toUpperCase();
            const dayData = days.find(ele => ele.REP_DATE.DAY == currentDay);
            let clocks = dayData.REP_DATE.LINES[i];
            if (clocks) {
                const { IN, OUT } = get_hh_mm(clocks);
                row.col.push({
                    day: label[j],
                    in: IN,
                    out: OUT
                })
            } else {
                row.col.push({
                    day: label[j],
                    in: "----",
                    out: "----"
                })
            }
        }
        finalArray.push(row);
    }
    return { ...data, finalArray, total_hours };
}
