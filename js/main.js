document.addEventListener('DOMContentLoaded', function() {
    //model data
    var model = {
        students: [{
            name: 'Slappy the Frog',
            attendence: [1, 2, 3, 6, 8, 11]
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
        totalLessons : 12
    };

    //octopus
    var octopus = {
        getTotalLesson : function(){
            return model.totalLessons;
        },
        getStudents : function(){
            return model.students;
        },
        addAttend: function(student, num){
            if (num < 1 || num > model.totalLessons) {
                console.log('Wrong class number');
            }
            else if (!(num in student.attendence)) {
                student.attendence.push(num);
                student.attendence.sort();
            }
        },
        delAttend: function(student, num){
            if (num in student.attendence) {
                var numPos;
                var len = student.attendence.length;
                for (var i = 0; i < len; i++) {
                    if (num === student.attendence[i]) {
                        numPos = i;
                    }
                }
                student.attendence = student.attendence.slice(0, i).concat(student.attendence.slice(i + 1, len));
            }
        },
        init : function(){
            view.init();
        }
    }

    // view
    var view = {
        createHeadRow : function(){
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

        updateCheckBox: function(student, num) {


        },

        createStudentRow: function(student) {
            var studentRow = document.createElement('tr');
            studentRow.classList.add('student');
            var studentName = document.createElement('td');
            studentName.classList.add('name-col');
            studentName.textContent = student.name;
            studentRow.appendChild(studentName);
            console.log(student.attendence);

            for(var i = 0, len1 = octopus.getTotalLesson(); i < len1; i++) {
                var boxContainer = document.createElement('td');
                boxContainer.classList.add('attend-col');
                var box = document.createElement('input');
                box.type = 'checkbox';
                for(var j = 0, len2 = student.attendence.length; j < len2; j++) {
                    if ((i + 1) === student.attendence[j]) {
                        box.checked = 'True';
                    }
                }
                boxContainer.appendChild(box);
                studentRow.appendChild(boxContainer);
            }
            var missDay = document.createElement('td');
            missDay.classList.add('missed-col');
            missDay.textContent = 0;
            studentRow.appendChild(missDay);
            this.tBodyElem.appendChild(studentRow);
        },
        init: function(){
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
