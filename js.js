var rederSpace = {
    rederyear: "",//�����
    redermonth: "",//�����
    rederdate: "",//�����
    arrayYear: [],//10�����
    arrayChangeYear: [],//��ű仯�е����
    arrayMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],//�����·�
    currayDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],//���ÿ���µ�����
    isLeapYear: function (year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    },
    //��ʼ����Ĭ�ϲ���
    setDefault: function () {
        if (arguments.length == 0 && this.rederyear == "") {
            var date = new Date();
            var currentYear = date.getFullYear();
            var currentMonth = date.getMonth() + 1;
            var currentDays = date.getDate();
            this.rederyear = currentYear;
            this.redermonth = currentMonth;
            this.rederdate = currentDays;
            var currentYearInit = currentYear - 4;
            var i = 0;
            while (i < 10) {
                this.arrayYear.push(currentYearInit + i);
                i++;
            }
        } else {
            var postMonth = this.redermonth;
            if (arguments[0] == "prev") {
                if (postMonth == 1) {
                    this.rederyear = this.rederyear - 1;
                    this.redermonth = 12;
                    this.rederdate = 1;
                } else {
                    this.redermonth = this.redermonth - 1;
                    this.rederdate = 1;
                }
            } else if (arguments[0] == "next") {
                if (postMonth == 12) {
                    this.rederyear = this.rederyear + 1;
                    this.redermonth = 1;
                    this.rederdate = 1;
                } else {
                    this.redermonth = this.redermonth + 1;
                    this.rederdate = 1;
                }
            }
        }
        this.currayDays.splice(1, 1, 28 + this.isLeapYear(this.rederyear));
    },
    init: function (divs) {
        this.setDefault();
        this.creatYear();
        this.creatMenu(divs);
        this.creatMonth();
        document.getElementById("year").innerHTML = rederSpace.rederyear + "��";
        document.getElementById("month").innerHTML = rederSpace.redermonth + "��";
        document.getElementById("reder").innerHTML = rederSpace.print();
        this.initDayEvent();
        //�����һ���ڵ㣬�����һ���ڵ�
        document.getElementById("prev").addEventListener("click", function () {
            rederSpace.setDefault("prev")//;
            rederSpace.creatMenu(divs);
            document.getElementById("year").innerHTML = rederSpace.rederyear + "��";
            document.getElementById("month").innerHTML = rederSpace.redermonth + "��";
            document.getElementById("reder").innerHTML = rederSpace.print();
            rederSpace.initDayEvent();
        });
        document.getElementById("next").addEventListener("click", function () {
            rederSpace.setDefault("next")//;
            rederSpace.creatMenu(divs);
            document.getElementById("year").innerHTML = rederSpace.rederyear + "��";
            document.getElementById("month").innerHTML = rederSpace.redermonth + "��";
            document.getElementById("reder").innerHTML = rederSpace.print();
            rederSpace.initDayEvent();
        });
        this.initYearPrevEvent(divs);
        this.initMonth(divs);
        this.initMonthEvent(divs);

    },
    initMonth: function (divs) {
        document.getElementById("month").addEventListener("click", function () {
            document.getElementById("boxMonth").style.display = "block";
        });
    },
    initDayEvent: function () {
        var dayList = this.getElementsByClassName(document.getElementById("reder"), "dayClass");
        if (dayList && dayList.length > 0) {
            for (var i = 0; i < dayList.length; i++) {
                (function (i) {
                    dayList[i].addEventListener("click", function () {
                        rederSpace.rederdate = parseInt(dayList[i].innerText);
                        alert("��ѡ�е���" + rederSpace.rederyear + "��" + rederSpace.redermonth + "��" + rederSpace.rederdate + "ri");
                    });
                })(i);
            }
        }
    },
    initMonthEvent: function (divs) {
        var monthList = this.getElementsByClassName(document.getElementById("boxMonth"), "monthClass");
        if (monthList && monthList.length > 0) {
            for (var i = 0; i < monthList.length; i++) {
                (function (i) {
                    monthList[i].addEventListener("click", function () {
                        rederSpace.redermonth = parseInt(monthList[i].innerText);
                        rederSpace.setDefault();
                        rederSpace.creatMenu(divs);
                        document.getElementById("year").innerHTML = rederSpace.rederyear + "��";
                        document.getElementById("month").innerHTML = rederSpace.redermonth + "��";
                        document.getElementById("reder").innerHTML = rederSpace.print();
                        rederSpace.initDayEvent();
                        document.getElementById("boxMonth").style.display = "none";
                    });
                })(i);
            }
        }
    },
    initYearPrevEvent: function (divs) {
        document.getElementById("year").addEventListener("click", function () {
            document.getElementById("box").style.display = "block";
        });
        this.initYearPrev(divs);
        document.getElementById("yearPrev").addEventListener("click", function () {
            var arrayChangeYearValue = parseInt(this.getAttribute("dateValue")) - 10;
            var i = 0;
            rederSpace.arrayChangeYear = [];
            while (i < 10) {
                rederSpace.arrayChangeYear.push(arrayChangeYearValue + i);
                i++;
            }
            rederSpace.creatYear();
            rederSpace.initYearPrev();
            this.setAttribute("dateValue", arrayChangeYearValue);
        });
        document.getElementById("yearNext").addEventListener("click", function () {
            var arrayChangeYearValue = parseInt(this.getAttribute("dateValue")) + 10;
            var i = 0;
            rederSpace.arrayChangeYear = [];
            while (i < 10) {
                rederSpace.arrayChangeYear.push(arrayChangeYearValue + i);
                i++;
            }
            rederSpace.creatYear();
            rederSpace.initYearPrev();
            this.setAttribute("dateValue", arrayChangeYearValue);
        });
    },
    //��ʼ���·�ѡ��״̬

    //��ʼ�������ǰѡ��
    initYearPrev: function (divs) {
        var yearList = this.getElementsByClassName(document.getElementById("box"), "yearClass");
        if (yearList && yearList.length > 0) {
            for (var i = 0; i < yearList.length; i++) {
                (function (i) {
                    yearList[i].addEventListener("click", function () {
                        rederSpace.rederyear = parseInt(yearList[i].innerText);
                        rederSpace.setDefault();
                        rederSpace.creatMenu(divs);
                        document.getElementById("year").innerHTML = rederSpace.rederyear + "��";
                        document.getElementById("month").innerHTML = rederSpace.redermonth + "��";
                        document.getElementById("reder").innerHTML = rederSpace.print();
                        rederSpace.initDayEvent();
                        document.getElementById("box").style.display = "none";
                    });
                })(i);
            }
        }
    },
    //������
    creatYear: function () {
        //���������һ���ǳ�ʼ��һ���������㣬һ������ǰ��������������
        //��1������
        var yearTable = document.getElementById("box");
        if (!yearTable) {
            yearTable = document.createElement("UL");
            yearTable.className = "box";
            yearTable.id = "box";
            var objLi0 = document.createElement("li");
            objLi0.id = 'yearPrev';
            objLi0.setAttribute("dateValue", this.arrayYear[0])
            objLi0.innerHTML = "<a href='#' > ��ǰ</a>";
            yearTable.appendChild(objLi0);
            var i = 0;
            while (i < 10) {
                var objLi = document.createElement("li");
                objLi.className = "yearClass";
                objLi.innerHTML = "<a href='#' >" + this.arrayYear[i] + "</a>";
                i++;
                yearTable.appendChild(objLi);
            }
            var objLi1 = document.createElement("li");
            objLi1.id = 'yearNext';
            objLi1.setAttribute("dateValue", this.arrayYear[9]);
            objLi1.innerHTML = "<a href='#' > ����</a>";
            yearTable.appendChild(objLi1);
            document.body.appendChild(yearTable);
        }
        else {
            var obj = document.getElementById("box");
            var nodeList = obj.getElementsByTagName("li");
            var i = 0;
            var anchors = Array.prototype.slice.call(nodeList);
            this.removeChildren(obj)
            anchors.splice(1, 10);
            yearTable.appendChild(anchors[0]);
            yearTable.appendChild(anchors[1]);
            while (i < 10) {
                var objLi = document.createElement("li");
                objLi.className = "yearClass";
                objLi.innerHTML = "<a href='#' >" + this.arrayChangeYear[i] + "</a>";
                yearTable.insertBefore(objLi, anchors[anchors.length - 1]);
                i++;
            }
        }
    },
    //������
    creatMonth: function () {
        var yearTable = document.getElementById("boxMonth");
        if (!yearTable) {
            yearTable = document.createElement("UL");
            yearTable.className = "box";
            yearTable.id = "boxMonth";
            var i = 0;
            while (i < 12) {
                var objLi = document.createElement("li");
                objLi.className = "monthClass";
                objLi.innerHTML = "<a href='#' >" + this.arrayMonth[i] + "</a>";
                i++;
                yearTable.appendChild(objLi);
            }
            document.body.appendChild(yearTable);
        }
    },
    creatMenu: function (divs) {
        var menuObj = document.getElementById("menu");
        if (!menuObj) {
            var menuDiv = document.createElement("DIV");
            menuDiv.id = "menu";
            var menuUl = document.createElement("UL");
            var menuLoPre = document.createElement("LI");
            menuLoPre.style.width = "30%";
            menuLoPre.innerHTML = "<<<<<";
            menuLoPre.id = "prev";
            var menuLoTitle = document.createElement("LI");
            menuLoTitle.id = "monthYear";
            var strYear = '<table style="width:100%;"><tr>';
            strYear += '<td id="year"></td>';
            strYear += '<td id="month"></td>';
            strYear += "</tr><table>";
            menuLoTitle.innerHTML = strYear;
            var menuLoNext = document.createElement("LI");
            menuLoNext.style.width = "30%";
            menuLoNext.innerHTML = ">>>>>";
            menuLoNext.id = "next";
            var rederDiv = document.createElement("DIV");
            rederDiv.id = "reder";
            menuUl.appendChild(menuLoPre);
            menuUl.appendChild(menuLoTitle);
            menuUl.appendChild(menuLoNext);
            menuDiv.appendChild(menuUl);
            menuDiv.appendChild(rederDiv);
            divs.appendChild(menuDiv);
        }//����ѡ�е���

    },
    print: function () {
        var strHtml = "";
        strHtml += "<table>";
        strHtml += "<tr style='color:red'><td>������</td><td>����һ</td><td>���ڶ�</td><td>������</td><td>������</td><td>������</td><td>����6</td></tr>";
        var days = this.currayDays[this.redermonth - 1];
        var tt = this.redermonth;
        if (this.redermonth < 10) {
            tt = "0" + this.redermonth;
        }
        var theMonthFirstFullDay = this.rederyear + "-" + tt + "-01";
        var day = new Date(Date.parse(theMonthFirstFullDay.replace(/-/g, '/'))); //������ֵ��ʽ��
        var stadates = day.getDay()//
        strHtml += "<tr>";
        var k = 0;
        if (stadates > 0) {
            for (k = 0; k < stadates; k++) {
                strHtml += "<td ></td>";
            }
        }
        for (var j = 0; j < days; j++) {
            var m = j + k;
            if (m % 7 == 0 && m !== 0) {
                strHtml += "<tr>"
            }
            if (this.rederdate == (j + 1)) {
                strHtml += "<td style='color:red' class='dayClass'>" + (j + 1) + "</td>";
            } else {
                strHtml += "<td class='dayClass'>" + (j + 1) + "</td>";
            }

            if (m % 7 + 1 == 0 && m !== 0) {
                strHtml += "</tr>"
            }
        }
        strHtml += "</tr></table>";
        return strHtml;
    },
    //����className��ȡԪ��
    getElementsByClassName: function (obj, n) {
        var classElements = [];
        var allElements = obj.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].className == n) {
                classElements[classElements.length] = allElements[i];
            }
        }
        return classElements;
    },
    //�Ƴ������ӽڵ�
    removeChildren: function (pnode) {
        var childs = pnode.childNodes;
        for (var i = childs.length - 1; i >= 0; i--) {
            pnode.removeChild(childs.item(i));
        }
    }
}
