from flask import Flask, session, redirect, url_for, request, render_template, flash
from flask_restful import Api
import sys
from passlib.hash import sha256_crypt
from werkzeug.utils import secure_filename
import os
from functools import wraps
import mysql
import mysql.connector

from views import table_test, TableAnimalUpdate, TableAnimalAdd,TableInventoryPasture, TableInventoryFormulary, TableHealthList, TableHerd,TableInventoryPastureHistory,TableHerdUniqueName, TableExperiment, TableHealthAdd, TableReproduction,Expt,TableInspection,Drug,Report, ReportAll,Event,cow_2014_list,search,Demo,DemoDataInBetweenDates,DemoUploadInsert, StandardQuery1, StandardQuery2, StandardQuery3, ViewTables, DeleteTables

app = Flask(__name__)

app.config['SECRET_KEY'] = "The Secret String"
app.config['UPLOAD_FOLDER']='/static/pdf_files/'
ALLOWED_EXTENSIONS=set(['txt','pdf','png','jpg'])

#cnx = mysql.connector.connect(host="livebarn.mysql.pythonanywhere-services.com", user="livebarn", passwd="barnyard123$", db="livebarn$barnyard")
cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
# bcrypt = Bcrypt(app)


# API configurations
#These will send and recieve data according to the functions they are assigned to in the Views page.
api = Api(app)

# Testing for the new MYSQL db connection
api.add_resource(table_test, '/api/test/', endpoint="18")
api.add_resource(table_test, '/api/test/')

# APIs for the new UI Design
api.add_resource(TableAnimalUpdate, '/api/animal/update/<Animal_ID>')
api.add_resource(TableAnimalUpdate, '/api/animal/update/', endpoint="20")

api.add_resource(TableAnimalAdd, '/api/animal/add/<Animal_ID>')
api.add_resource(TableAnimalAdd, '/api/animal/add/', endpoint="19")

api.add_resource(TableHerd, '/api/herd/create/')
api.add_resource(TableHerd, '/api/herd/create/', endpoint="21")

api.add_resource(TableInventoryPasture, '/api/inventory/pasture/')
api.add_resource(TableInventoryPasture, '/api/inventory/pasture/', endpoint="22")

api.add_resource(TableInventoryPastureHistory, '/api/inventory/pasturehistory/<pasture_ID>/<event_date>')
api.add_resource(TableInventoryPastureHistory, '/api/inventory/pasturehistory/', endpoint="23")

api.add_resource(TableHerdUniqueName, '/api/herd/name/<name>')
api.add_resource(TableHerdUniqueName, '/api/herd/name/', endpoint="24")

api.add_resource(TableInventoryFormulary, '/api/inventory/formulary/<Medicine_ID>')
api.add_resource(TableInventoryFormulary, '/api/inventory/formulary/', endpoint="25")


api.add_resource(TableExperiment, '/api/experiment/herd/<Animal_ID>')
api.add_resource(TableExperiment, '/api/experiment/herd/', endpoint="26")

api.add_resource(TableHealthAdd, '/api/health/add/<animalname>')
api.add_resource(TableHealthAdd, '/api/health/add/', endpoint="27")

api.add_resource(TableHealthList, '/api/health/record/<Record_ID>')
api.add_resource(TableHealthList, '/api/health/record/', endpoint="28")

api.add_resource(TableReproduction, '/api/reproduction/record/<ID>')
api.add_resource(TableReproduction, '/api/reproduction/record/', endpoint="29")

api.add_resource(Expt, '/api/experiment/list/<Animal_ID>/<expt_date>')
api.add_resource(Expt, '/api/experiment/list/', endpoint="30")

api.add_resource(TableInspection, '/api/inspection/report/')
api.add_resource(TableInspection, '/api/inspection/report/', endpoint="31")

api.add_resource(Drug, '/api/formulary/drug/<drug>')
api.add_resource(Drug, '/api/formulary/drug/', endpoint="32")

api.add_resource(Report, '/api/report/create/<Animal_ID>/<start_date>/<end_date>')
api.add_resource(Report, '/api/report/create/', endpoint="33")

api.add_resource(ReportAll, '/api/report/get/<ID>')
api.add_resource(ReportAll, '/api/report/get/', endpoint="34")

api.add_resource(Event, '/api/tempsearchpage/get/')
api.add_resource(Event, '/api/tempsearchpage/get/', endpoint="35")

api.add_resource(cow_2014_list, '/api/cow_2014_list/get/')
api.add_resource(cow_2014_list, '/api/cow_2014_list/get/', endpoint = "36")

api.add_resource(search, '/api/health/record/<start_date>/<end_date>')
api.add_resource(search, '/api/health/record/', endpoint = "37")

api.add_resource(Demo, '/api/Demo/get/')
api.add_resource(Demo, '/api/Demo/get/', endpoint = "40")

api.add_resource(DemoDataInBetweenDates, '/api/DemoDataInBetweenDates/<start_date>/<end_date>')
api.add_resource(DemoDataInBetweenDates, '/api/DemoDataInBetweenDates/', endpoint = "42")

#end point for upload csv in demo
api.add_resource(DemoUploadInsert, '/api/demoUploadInsert/<EID>/<date_registered>/<weight>/<type>/<date_scanned>/')
api.add_resource(DemoUploadInsert, '/api/demoUploadInsert/', endpoint = "39")

api.add_resource(StandardQuery1, '/api/Standard/Query1/')
api.add_resource(StandardQuery1, '/api/Standard/Query1/', endpoint = "45")

api.add_resource(StandardQuery2, '/api/Standard/Query2/')
api.add_resource(StandardQuery2, '/api/Standard/Query2/', endpoint = "46")

api.add_resource(StandardQuery3, '/api/Standard/Query3/')
api.add_resource(StandardQuery3, '/api/Standard/Query3/', endpoint = "47")

api.add_resource(ViewTables, '/api/tables/')
api.add_resource(ViewTables, '/api/tables/', endpoint = "48")

api.add_resource(DeleteTables, '/api/tables/deleteTable/<nameOfTable>/')
api.add_resource(DeleteTables, '/api/tables/deleteTable/', endpoint = "49")





#App Routes
#These will reroute all the data through the webpage to its destinations

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash("You need to login first")
            return redirect(url_for('login'))
    wrap.__name__ = f.__name__
    return wrap

@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == 'GET':
        return render_template("signup.html")
    else:
        print >> sys.stderr, 'Registering...'
        name = request.form['name']
        last_name = request.form['last_name']
        email = request.form['email']
        roles = request.form['roles']
        registered_at = request.form['registered_at']
        password = sha256_crypt.encrypt((str(request.form['password'])))
        cur = cnx.cursor(dictionary=True)
        cur.execute("INSERT INTO login (first_name,last_name, email_id, password,roles,registered_at) VALUES (%s,%s,%s,%s,%s)",(name,last_name,email,password,roles,registered_at,))
        print("here after execute")
        cnx.commit()
        print >> sys.stderr, 'Returning...'
        return "Success", 201

@app.route('/login',methods=["GET","POST"])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password'].encode('utf-8')
        cur = cnx.cursor(dictionary=True)
        cur.execute("SELECT * FROM login WHERE email_id=%s",(email,))
        user = cur.fetchone()
        print("reached login print text")
        try:
            if len(user) > 0:
                try:
                    if sha256_crypt.verify(password, user["password"]):
                        session['name'] = user["first_name"]
                        session['email'] = user["email_id"]
                        session['roles'] = user["roles"]
                        session['logged_in'] = True
                        return redirect(url_for('home'))
                    else:
                        flash("Error password and email don't match")
                        return redirect(url_for('login'))
                except ValueError:
                    flash("Error password and email don't match")
                    return redirect(url_for('login'))
            else:
                flash("Error user not found")
                return redirect(url_for('login'))
        except TypeError:
            flash("Error user not found")
            return redirect(url_for('login'))
    else:
        return render_template("login.html")


@app.route('/ChangePassword', methods=['GET','POST'])
@login_required
def changepassword():
    if request.method == 'POST':
        email = session['email']
        password = request.form['OldPassword'].encode('utf-8')
        newpassword = request.form['NewPassword'].encode('utf-8')
        cur = cnx.cursor(dictionary=True)
        cur.execute("SELECT * FROM login WHERE email_id=%s",(email,))
        user = cur.fetchone()
        try:
            if sha256_crypt.verify(password, user["password"]):
                hashpassword = sha256_crypt.encrypt((str(newpassword)))
                cur.execute("UPDATE login SET password = %s WHERE email_id=%s",(hashpassword,email,))
                cnx.commit()
                flash("Password Changed")
                return redirect(url_for('changepassword'))
            else:
                flash("Error Old password is wrong")
                return redirect(url_for('changepassword'))
        except ValueError:
            flash("Error Old password is wrong")
            return redirect(url_for('changepassword'))
        cur.close()
        cnx.close()
    else:
        return render_template("Change_Password.html")

@app.route('/user/list', methods=["GET", "POST","PATCH","DELETE"])
@login_required
def user():
    return render_template("userlist.html")


@app.route('/user/add', methods=["GET", "POST","PATCH","DELETE"])
def useradd():
    return redirect(url_for("register"))


@app.route("/logout")
def logout():
    session['logged_in'] = False
    session.clear()
    return redirect(url_for('login'))

@app.route('/tempsearchpage', methods=["GET","POST","DELETE"])
@app.route('/')
@login_required
def home():
    return render_template("tempsearchpage.html")


@app.route('/animal/add', methods=['GET','POST','PATCH'])
@login_required
def animaladd():
        return render_template("animaladd.html")


@app.route('/animal/list')
@login_required
def animallist():
    return render_template("animallist.html")

@app.route('/UserInfo')
@login_required
def userinfo():
    return render_template("userinfo.html")


@app.route('/animal/update', methods=['GET','DELETE'])
@login_required
def animalupdate():
    return render_template("animalupdate.html")

@app.route('/cow/list', methods=['GET'])
@login_required
def cowlist():
    return render_template("cows_2014_list.html")


@app.route('/Demo/', methods=['GET'])
@login_required
def Demo():
    return render_template("Demo.html")



@app.route('/upload/file' ,methods= ['GET'])
@login_required
def UploadPDF():
    return render_template("test.html")

@app.route('/experiment/add', methods=['GET', 'POST'])
@login_required
def experimentadd():
    return render_template("experimentadd.html")


@app.route('/experiment/list', methods=['GET','PATCH','DELETE'])
@login_required
def experiment_list():
    return render_template("experiment_list.html")

@app.route('/experiment/animal/update', methods=['GET','PATCH','DELETE'])
@login_required
def experiment_animal_update():
    return render_template("experiment_animal_update.html")


@app.route('/experiment/edit', methods=['GET', 'POST','PATCH','DELETE'])
@login_required
def experiment_edit():
    return render_template("experiment_edit.html")


@app.route('/experiment/update', methods=['GET', 'POST', 'PATCH'])
@login_required
def experimentupdate():
    return render_template("experiment_update.html")


@app.route('/report/create',methods=['GET', 'POST', 'PATCH', 'DELETE'])
@login_required
def report_create():
    return render_template("report_create.html")


@app.route('/report/list',methods=['GET', 'POST', 'PATCH', 'DELETE'])
@login_required
def report_list():
    return render_template("report_view.html")


@app.route('/report/view',methods=['GET', 'POST', 'PATCH', 'DELETE'])
@login_required
def report_view():
    return render_template("report_open.html")


@app.route('/inventory/formulary',methods=['GET', 'POST', 'PATCH', 'DELETE'])
@login_required
def inventory_formulary():
    return render_template("inventory_formulary.html")


@app.route('/inventory/pasture',methods=['GET','POST','PATCH','DELETE'])
@login_required
def inventory_pasture():
    return render_template("inventory_pasture.html")


@app.route('/inventory/procedure')
@login_required
def inventory_procedure():
    return render_template("inventory_procedure.html")


@app.route('/inspection/submit',methods=['GET','POST'])
@login_required
def inspection_submit():
    return render_template("inspection_submit.html")


@app.route('/inspection/view')
@login_required
def inspection_view():
    return render_template("inspection_view.html")


@app.route('/reproduction/calfadd')
@login_required
def reproduction_add_calf():
    return render_template("reproduction_add_calf.html")


@app.route('/reproduction/listview')
@login_required
def reproduction_view_list():
    return render_template("reproduction_view_list.html")


@app.route('/reproduction/calfview')
@login_required
def reproduction_view_calf():
    return render_template("reproduction_view_calf.html")


@app.route('/health/add',methods=['POST','GET',])
@login_required
def healthadd():
    return render_template("health_add.html")


@app.route('/health/list',methods=['POST','GET','PATCH','DELETE'])
@login_required
def healthlist():
    return render_template("health_list.html")

@app.route('/DemoDataInBetweenDates',methods=['GET'])
@login_required
def DemoDataInBetweenDates():
    return render_template("DemoDataInBetweenDates.html")
    
@app.route('/Standard/Queries',methods=['GET'])
@login_required
def StandardQueries():
    return render_template("StandardQueries.html")

@app.route('/tables',methods=['GET'])
@login_required
def view_tables():
    return render_template("tables.html")    


@app.route('/health/update',methods=['PATCH','GET'])
@login_required
def healthupdate():
    return render_template("health_update.html")


@app.route('/herd/create', methods=['GET','POST'])
@login_required
def herd_create():
    return render_template("herd_create.html")


@app.route('/herd/view')
@login_required
def herd_view():
    return render_template("herd_view.html")


@app.route('/herd/grazing')
@login_required
def herd_grazing():
    return render_template("herd_grazing.html")




def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadajax', methods=['POST'])
def upload():
    file = request.files['file']

    if file and allowed_file(file.filename):
         filename = secure_filename(file.filename)
         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
         return filename,200


if __name__ == '__main__':
    app.run(debug=True)
