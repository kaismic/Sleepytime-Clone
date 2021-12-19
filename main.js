class Main {
    constructor() {
        // homepage elements
        this.homepage = document.getElementById("homepage")

        this.calChoice = document.getElementById("calChoice")
        this.calChoice.addEventListener("change", this.hideOptions.bind(this))
        
        this.timeOptions = document.getElementById("timeOptions")
        this.hourOption = document.getElementById("hourOption")
        this.minuteOption = document.getElementById("minuteOption")
        this.AMPMOption = document.getElementById("AMPMOption")
        
        this.calculateBtn = document.getElementById("calculateBtn")
        this.calculateBtn.addEventListener("click", this.showResultPage.bind(this))
        
        // result page elements
        this.resultPage = document.getElementById("resultPage")
        this.resultPage.style.display = "none"

        this.advice = document.getElementById("advice")
        this.result = document.getElementById("result")
        this.calculateAgainBtn = document.getElementById("calculateAgainBtn")
        this.calculateAgainBtn.addEventListener("click", this.showHomepage.bind(this))

        let option
        for (let i = 1; i <= 12; i++) {
            option = document.createElement("option")
            option.text = i
            option.value = i
            this.hourOption.appendChild(option)
        }
        let optionText
        for (let i = 0; i <= 11; i++) {
            option = document.createElement("option")
            // To output like 2:05 not 2:5
            optionText = i <= 1 ? "0" + i * 5 : i * 5
            option.text = optionText
            option.value = i * 5
            this.minuteOption.appendChild(option)
        }
    }

    hideOptions() {
        this.timeOptions.style.display = "initial"
        if (this.calChoice.selectedIndex == 2) {
            this.timeOptions.style.display = "none"
        }
    }
        
    showResultPage() {
        if (this.calChoice.selectedIndex == 0) { // have to wake up at
            this.showHaveToWakeUpAtResult()
        } else if (this.calChoice.selectedIndex == 1) { // plan to fall asleep at
            this.showPlanToSleepResult()
        } else { // sleep now
            this.showSleepNowResult()
        }
        this.homepage.style.display = "none"
        this.resultPage.style.display = "block"
    }
    
    showHomepage() {
        this.homepage.style.display = "block"
        this.resultPage.style.display = "none"
    }

    showHaveToWakeUpAtResult() {
        this.advice.innerText = "You should try to fall asleep at one of the following times:"
        let resultText = ""
        for (let i = 0; i < 4; i++) {
            resultText += "<span>" + this.calculate(i * 90 - 540) + "</span>"
            if (i < 3) {
                resultText += "<i> or </i>"
            }
        }
        this.result.innerHTML = resultText
    }

    showPlanToSleepResult() {
        let hour = Number(this.hourOption.value)
        let minute = Number(this.minuteOption.value)
        if (minute < 10) {
            minute = "0" + minute
        }
        let AMPM = this.AMPMOption.value
    
        this.advice.innerText = `If you fall asleep at ${hour}:${minute} ${AMPM}, you should try to wake up at one of the following times:`
        let resultText = ""
        for (let i = 0; i < 6; i++) {
            resultText += "<span>" + this.calculate(i * 90 + 90) + "</span>"
            if (i < 5) {
                resultText += "<i> or </i>"
            }
        }
        this.result.innerHTML = resultText
    }

    
    showSleepNowResult() {
        this.advice.innerText = "If you head to bed right now, you should try to wake up at one of the following times:"
        let resultText = ""
        for (let i = 0; i < 6; i++) {
            resultText += "<span>" + this.calculate(i * 90 + 90) + "</span>"
            if (i < 5) {
                resultText += "<i> or </i>"
            }
        }
        this.result.innerHTML = resultText
    }

    calculate(addingTime) {
        let hour, minute, AMPM
        if (this.calChoice.selectedIndex == 2) {
            let currDate = new Date()
            hour = currDate.getHours()
            minute = currDate.getMinutes()
        } else {
            hour = Number(this.hourOption.value)
            minute = Number(this.minuteOption.value)
            AMPM = this.AMPMOption.value
            if (AMPM == "PM") {
                hour += 12
            }
        }
        let resultInMinute = (hour * 60 + minute) + addingTime
        if (resultInMinute < 0) {
            resultInMinute = (resultInMinute % 1440) + 1440
        } else if (resultInMinute > 1440) {
            resultInMinute = (resultInMinute % 1440)
        }
        
        let result = ""
        if (resultInMinute < 720) {
            result = Math.floor(resultInMinute / 60) + ":" + (resultInMinute % 60) + "AM"
            if (resultInMinute % 60 < 10) {
                result = Math.floor(resultInMinute / 60) + ":0" + (resultInMinute % 60) + "AM"
            }
        } else {
            resultInMinute -= 720
            result = Math.floor(resultInMinute / 60) + ":" + (resultInMinute % 60) + "PM"
            if (resultInMinute % 60 < 10) {
                result = Math.floor(resultInMinute / 60) + ":0" + (resultInMinute % 60) + "PM"
            }
        }
        // When result == 0:??
        let resultArr = result.split(":")
        if (resultArr[0] == "0") {
            result = "12:" + resultArr[1]
        }
        return result
    }
}

let main
window.onload = function() {
    main = new Main()
}
