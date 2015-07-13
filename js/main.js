document.addEventListener('DOMContentLoaded', function() {
    //model data
    var model = {
        students: [{
            name: 'Slappy the Frog',
            attendence: Array(1, 2, 3, 6, 8, 11)
        }, {
            name: 'Lilly the Lizard',
            attendence: [1, 3, 4, 6, 7, 11]
        }, {
            name: 'Paulrus the Walrus',
            attendence: [1, 2, 3, 4, 5, 11, 12]
        }, {
            name: 'Gregory the Goat',
            attendence: [1, 2, 3, 4, 6, 7, 9, 10, 12]
        }, {
            name: 'Adam the Anaconda',
            attendence: [1, 5, 8, 11, 12]
        }],
        totalLessons: 12
    };

    //octopus
    var octopus = {
        getTotalLesson: function() {
            return model.totalLessons;
        },
        getStudents: function() {
            return model.students;
        },
        ifAttended(attendence, lesson) {
            for (var i = 0, len = attendence.length; i < len; i++) {
                if (attendence[i] === lesson) {
                    return true;
                }
            }
            return false;
        },
        getAttend: function() {
            var attendences = [];
            for (var i = 0, len = model.students.length; i < len; i++) {
                attendences.push(model.students[i].attendence);
            }
            return attendences;
        },
        addAttend: function(student, num) {
            if (num < 1 || num > model.totalLessons) {
                console.log('Wrong class number');
            } else if (!(octopus.ifAttended(student.attendence, num))) {
                student.attendence = student.attendence.concat([parseInt(num)]);
            }
        },
        delAttend: function(student, num) {
            if (octopus.ifAttended(student.attendence, parseInt(num))) {
                var numPos = 0;
                var len = student.attendence.length;
                for (var i = 0; i < len; i++) {
                    if (num == student.attendence[i]) {
                        numPos = i;
                        break;
                    }
                }
                student.attendence = student.attendence.slice(0, i).concat(student.attendence.slice(i + 1, len));
            }
        },
        init: function() {
            view.init();
            view.render();
        }
    }

    // view
    var view = {
        createHeadRow: function() {
            var nameCol = document.createElement('th');
            nameCol.classList.add('name-col');
            nameCol.textContent = 'Student Name';
            this.headRowElem.appendChild(nameCol);
            for (var i = 0, len = octopus.getTotalLesson(); i < len; i++) {
                var lesson = document.createElement('th');
                lesson.textContent = i + 1;
                this.headRowElem.appendChild(lesson);
            }
            var missNum = document.createElement('th');
            missNum.classList.add('missed-col');
            missNum.textContent = 'Days missed-col';
            this.headRowElem.appendChild(missNum);
        },

        updateCheckbox: function(box, student) {
            if (box.checked) {
                octopus.addAttend(student, box.id);
            }
            else {
                octopus.delAttend(student, box.id);
            }
            view.render();
        },

        createStudentRow: function(student) {
            //store data for later use
            studentRow = document.createElement('tr');
            studentRow.classList.add('student');
            studentName = document.createElement('td');
            studentName.classList.add('name-col');
            studentName.textContent = student.name;
            studentRow.appendChild(studentName);
            for (var i = 0, len = octopus.getTotalLesson(); i < len; i++) {
                var boxContainer = document.createElement('td');
                boxContainer.classList.add('attend-col');
                var box = document.createElement('input');
                box.type = 'checkbox';
                box.id = i + 1;
                if (octopus.ifAttended(student.attendence, i + 1)) {
                    box.click();
                }
                box.addEventListener('click', function() {
                    var realI = parseInt(this.id);
                    view.updateCheckbox(this, student);
                });
                boxContainer.appendChild(box);
                studentRow.appendChild(boxContainer);
            }
            var missDay = document.createElement('td');
            missDay.classList.add('missed-col');
            missDay.textContent = 0;
            studentRow.appendChild(missDay);
            this.tBodyElem.appendChild(studentRow);
        },

        render: function() {
            var missDays = document.getElementsByClassName('missed-col');
            var attendences = octopus.getAttend();
            var totalLesson = octopus.getTotalLesson();
            for(var i = 0, len = missDays.length - 1; i < len; i++) {
                missDays[i + 1].textContent = totalLesson - attendences[i].length;
            }
        },

        init: function() {
            //store DOM element for later use
            this.headRowElem = document.getElementById('headRow');
            this.tBodyElem = document.getElementById('tableBody');
            view.createHeadRow();
            var students = octopus.getStudents();
            for (var i = 0, len = students.length; i < len; i++) {
                view.createStudentRow(students[i]);
            }
        }
    }
    octopus.init();
});
