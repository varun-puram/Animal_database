# from mysql.connector import (connection)
from mysql.connector import errorcode, errors
from flask_restful import Resource
import sys
import mysql
import datetime
from flask import jsonify, request

class table_test(Resource):
    def get(self):
        #print( "Execution started", file=sys.stderr)
        print("Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                #print("Something is wrong with your user name or password", file=sys.stderr)
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                #print("Database does not exist", file=sys.stderr)
                print("Database does not exist",file=sys.stderr) 
            else:
                #print(err, file=sys.stderr)
                print("err",file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            #cursor.execute("SELECT * from animal_table")
            cursor.execute("""SELECT a.sub_pasture,a.Animal_ID,animalname,animaltype,eartag,eid,p.pasturenumber, weight,
                                    height,gender,sex,breed,status,current_expt_no,Herd,breeder,currentframescore,
                                    damframescore,comments,species,a.email_id,brand,brandlocation,tattooleft,tattooright,
                                    alternativeid,registration,color,hornstatus,dam,sire,DOB,howacquired,dateacquired,
                                    howdisposed,datedisposed ,disposalreason ,herdnumberlocation ,herdstatus ,
                                    howconceived, managementcode ,ownerID ,springfall ,includeinlookups from animal_table a,pasture p WHERE a.pasture_ID=p.pasture_ID""")
            rows = cursor.fetchall()
            #print("Fetch Test Completed", file=sys.stderr)
            print("Fetch Test Completed",file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    # for super users to provide roles
    def post(self):
        data = request.get_json(force=True)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            # New comment line
            cursor = cnx.cursor(dictionary=True)

            update_users = ("""UPDATE login SET roles=%(roles)s WHERE email_id=%(email_id)s""")
            print( "super user changing roles", file=sys.stderr)

            print( "Got the data", file=sys.stderr)
            for k, v in data.iteritems():
                print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
            print>>sys.stderr, "Next is the execute command, Here it goes"
            try:
                cursor.execute(update_users, data)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def patch(self):
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            # New comment line
            cursor = cnx.cursor(dictionary=True)

            update_users = ("""select * from login""")
            print( "show users", file=sys.stderr)
            try:
                cursor.execute(update_users)
                rows = cursor.fetchall()
                print("Fetch Test Completed", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close
                return jsonify(rows)

    def delete(self):
        data = request.get_json(force=True)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            # New comment line
            cursor = cnx.cursor(dictionary=True)

            update_users = ("""delete from login WHERE email_id=%(email_id)s""")
            print( "deleting user", file=sys.stderr)
            try:
                cursor.execute(update_users, data)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()


class TableAnimalUpdate(Resource):
    def get(self, Animal_ID):
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err)
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("""SELECT * FROM animal_table WHERE Animal_ID = %s""", (Animal_ID,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            print(rows)
            cursor.close()
            cnx.close()
            return jsonify(rows)

    def patch(self,Animal_ID):

        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            data = request.get_json(force=True)
            print(data)
            for k, v in data.items():
                print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
            cursor = cnx.cursor(dictionary=True)
            print("animal update++++", file=sys.stderr)
            update_animaldata = ("""UPDATE animal_table SET animalname=%(animalname)s,animaltype=%(animaltype)s,eartag=%(eartag)s,eid=%(eid)s,pasture_ID=%(pasture_ID)s, weight=%(weight)s,
                                                height=%(height)s,gender=%(gender)s,sex=%(sex)s,breed=%(breed)s,status=%(status)s,current_expt_no=%(current_expt_no)s,Herd=%(Herd)s,breeder=%(breeder)s,currentframescore=%(currentframescore)s,
                                                damframescore=%(damframescore)s,comments=%(comments)s,species=%(species)s,email_id=%(email_id)s,brand=%(brand)s,brandlocation=%(brandlocation)s,tattooleft=%(tattooleft)s,tattooright=%(tattooright)s,
                                                alternativeid=%(alternativeid)s,registration=%(registration)s,color=%(color)s,hornstatus=%(hornstatus)s,dam=%(dam)s,sire=%(sire)s,DOB=%(DOB)s,howacquired=%(howacquired)s,dateacquired=%(dateacquired)s,
                                                howdisposed=%(howdisposed)s,datedisposed=%(datedisposed)s ,disposalreason=%(disposalreason)s ,herdnumberlocation=%(herdnumberlocation)s ,herdstatus=%(herdstatus)s ,
                                                howconceived=%(howconceived)s, managementcode=%(managementcode)s ,ownerID=%(ownerID)s ,springfall=%(springfall)s ,includeinlookups=%(includeinlookups)s,sub_pasture=%(sub_pasture)s
                                                WHERE Animal_ID=%(Animal_ID)s""")
            try:
                cursor.execute(update_animaldata,data)
                print("here after execute in update animal ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            finally:
                cursor.close()
                cnx.close()

    def delete(self,Animal_ID):
        #data = request.get_json(force=True)
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
            cursor = cnx.cursor(dictionary=True)
            print("animal delete++++", file=sys.stderr)
            update_animaldata = "DELETE FROM animal_table WHERE Animal_ID = %s"
            try:
                cursor.execute(update_animaldata,(Animal_ID,))
                print("here after execute in delete animal ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()


class TableAnimalAdd(Resource):
    def get(self, Animal_ID):
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
               print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("""SELECT animalname,Animal_ID FROM animal_table WHERE Animal_ID = %s""", (Animal_ID,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            print(rows, file=sys.stderr)
            cursor.close()
            cnx.close()
            return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.items():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
               print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in add animal class from the API call")
            insert_animaldata = ("""INSERT INTO animal_table (animalname,animaltype,eartag,eid,pasture_ID, weight,
                                    height,gender,sex,breed,status,current_expt_no,Herd,breeder,currentframescore,
                                    damframescore,comments,species,email_id,brand,brandlocation,tattooleft,tattooright,
                                    alternativeid,registration,color,hornstatus,dam,sire,DOB,howacquired,dateacquired,
                                    howdisposed,datedisposed ,disposalreason ,herdnumberlocation ,herdstatus ,
                                    howconceived, managementcode ,ownerID ,springfall ,includeinlookups,sub_pasture,entry_date)
                                    VALUES ( %(animalname)s, %(animaltype)s, %(eartag)s, %(eid)s, %(pasture_ID)s,
                                    %(weight)s, %(height)s, %(gender)s, %(sex)s, %(breed)s, %(status)s,
                                    %(current_expt_no)s, %(Herd)s,%(breeder)s, %(currentframescore)s, %(damframescore)s,
                                    %(comments)s,%(species)s, %(email_id)s,%(brand)s, %(brandlocation)s, %(tattooleft)s,
                                    %(tattooright)s, %(alternativeid)s, %(registration)s, %(color)s, %(hornstatus)s,
                                    %(dam)s, %(sire)s, %(DOB)s, %(howacquired)s,%(dateacquired)s, %(howdisposed)s,
                                    %(datedisposed)s, %(disposalreason)s,%(herdnumberlocation)s, %(herdstatus)s,
                                    %(howconceived)s, %(managementcode)s,%(ownerID)s, %(springfall)s,
                                    %(includeinlookups)s,%(sub_pasture)s,%(entry_date)s)""")
            try:
                cursor.execute(insert_animaldata, data)
                print("here after execute", file=sys.stderr)
                cursor = cnx.cursor(dictionary=True)
                select_animal = """select distinct Animal_ID from animal_table where animalname=%(animalname)s"""
                cursor.execute(select_animal, data)
                print("after select stmt", file=sys.stderr)
                rows = cursor.fetchall()
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def patch(self,Animal_ID):

        print( "Execution started in Repro", file=sys.stderr)
        print( "{}".format(Animal_ID), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            animal_data=("""SELECT a.animalname,ID,r.Animal_id, breeding, pregnancy, calfdob,damageatbirth,
                                    siblingcode, calfatside, totalcalves, previouscalf, currentcalf,calfbirthweight,
                                    calfsex, r.email_id, pasturenumber, damcalvingdisposition, calvingease,udderscore,
                                    conditionscorecalving,hiphtweaning,hiphtbreeding,damdisposition,cowframescore,cowwtbreeding,
                                    cowhtbreeding,cowwtweaning,cowhtweaning,cowwtcalving,cowhtcalving,bcsweaning,bcscalving,bcsbreeding,
                                    customcowwt,customcowht,bulldisposition,bullframescore,bullwtprebreeding,bullhtprebreeding,
                                    fertility,mobility,conc,deadabnormal,date from reproduction r,animal_table a where a.Animal_ID=r.Animal_id and r.Animal_id=%s""")
            cursor.execute(animal_data,(Animal_ID,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)


class TableInventoryPastureHistory(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            #cursor.execute("SELECT * from pasture_history")
            cursor.execute("""SELECT fertilizer_name , event_date, qualityofburn,sub_pasture,
                                    fertilizer_applicationrate, chemicalname, applicationrate, pesticide_method,
                                    email_ID, pasturenumber, comments, fertilizer_method from pasture_history """)
            rows = cursor.fetchall()
            print(rows, file=sys.stderr)
            print("Fetch Completed")
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
               print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in pasture class from the API call")
            insert_animaldata = ("""INSERT INTO pasture_history (fertilizer_name , event_date, qualityofburn,
                                    fertilizer_applicationrate, chemicalname, applicationrate, pesticide_method,
                                    pasture_ID, email_ID, pasturenumber, comments, fertilizer_method,sub_pasture)
                                    VALUES( %(fertilizer_name)s,%(event_date)s,%(qualityofburn)s,
                                    %(fertilizer_applicationrate)s, %(chemicalname)s,%(applicationrate)s,
                                    %(pesticide_method)s, %(pasture_ID)s,%(email_id)s,%(pasturenumber)s,
                                    %(comments)s,%(fertilizer_method)s,%(sub_pasture)s )""")
            try:
                cursor.execute(insert_animaldata, data)
                print("here after execute in pasture", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err))
                return None
            finally:
                cursor.close()
                cnx.close()

    def patch(self):
        print("in pasture patch", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            data = request.get_json(force=True)
            print(data, file=sys.stderr)
            for k, v in data.iteritems():
                print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
            cursor = cnx.cursor(dictionary=True)
            print("pasture update++++", file=sys.stderr)
            update_animaldata = ("""UPDATE pasture_history SET fertilizer_name=%(fertilizer_name)s,
                                                event_date=%(event_date)s,qualityofburn=%(qualityofburn)s,
                                                fertilizer_applicationrate=%(fertilizer_applicationrate)s,
                                                chemicalname=%(chemicalname)s, applicationrate=%(applicationrate)s,
                                                fertilizer_method=%(fertilizer_method)s, pasture_ID =%(pasture_ID)s,
                                                email_ID=%(email_ID)s,pasturenumber=%(pasturenumber)s,
                                                comments=%(comments)s,pesticide_method=%(pesticide_method)s,sub_pasture=%(sub_pasture)s
                                                WHERE pasturenumber =%(pasturenumber)s and event_date=%(event_date)s""")
            try:
                cursor.execute(update_animaldata,data)
                print("here after execute in update pasture ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err))
                return None
            finally:
                cursor.close()
                cnx.close()

    def delete(self, pasture_ID,event_date):
        # data = request.get_json(force=True)
        print("delete method++", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("animal delete++++", file=sys.stderr)
            update_animaldata = "DELETE FROM pasture_history WHERE pasturenumber = %s and event_date=%s"
            try:
                cursor.execute(update_animaldata, (pasture_ID, event_date,))
                print("here after execute in delete pasture ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err))
                return None
            finally:
                cursor.close()
                cnx.close()


class TableInventoryPasture(Resource):
    def get(self):
        print( "Execution started in pasture", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("SELECT * from pasture")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)


class TableInventoryFormulary(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("SELECT Medicine_ID,date,drug,vial_size,Lot_no,expirydate,location,roa,purchasedate,total_quantity,qty_in_stock,email_id from formulary order by drug")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()
        return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in formulary class from the API call")
            insert_animaldata = ("""INSERT INTO formulary (date,drug,vial_size,Lot_no,expirydate,location,roa,
                                    purchasedate,total_quantity,email_id,qty_in_stock)  VALUES( %(date)s,%(drug)s,%(vial_size)s,
                                    %(Lot_no)s, %(expirydate)s,%(location)s,%(roa)s, %(purchasedate)s,%(total_quantity)s,%(email_id)s,%(qty_in_stock)s )""")
            try:
                cursor.execute(insert_animaldata, data)
                print("here after execute in formulary", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def patch(self):
        print("in formulary patch", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            data = request.get_json(force=True)
            print(data, file=sys.stderr)
            for k, v in data.iteritems():
                print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
            cursor = cnx.cursor(dictionary=True)
            print("formulary update++++", file=sys.stderr)
            update_animaldata = ("""UPDATE formulary SET
                                                date=%(date)s,vial_size=%(vial_size)s,
                                                drug=%(drug)s,Lot_no =%(Lot_no)s,
                                                expirydate=%(expirydate)s, location=%(location)s,
                                                purchasedate=%(purchasedate)s, roa =%(roa)s,
                                                email_ID=%(email_ID)s,total_quantity=%(total_quantity)s
                                                WHERE  Medicine_ID=%(Medicine_ID)s""")
            try:
                cursor.execute(update_animaldata,data)
                print("here after execute in update pasture ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            finally:
                cursor.close()
                cnx.close()

    def delete(self,Medicine_ID):
        # data = request.get_json(force=True)
        print("delete method++", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("formulary delete++++", file=sys.stderr)
            update_animaldata = "DELETE FROM formulary WHERE Medicine_ID=%s"
            try:
                cursor.execute(update_animaldata, (Medicine_ID,))
                print("here after execute in delete formulary ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()


class TableHealthList(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            #cursor.execute("SELECT result,Record_ID,Animal_id,create_date,email_id,medical_notes,location,Amt_given,route,water_feed,"
              #            "withdraw_time,(select drug from formulary where medical_record.Medicine_ID=formulary.Medicine_ID)drug "
              #           "from medical_record;")
            #cursor.execute("select * from livebarn.medical_record where create_date between '2018-07-16' and '2020-05-19'")
            #cursor.execute("select * from livebarn.medical_record where create_date between '2018-07-17' and '2018-07-24'")
            #cursor.execute("select * from livebarn.medical_record where create_date between '1959-07-17' and '1961-07-24'")
            #cursor.execute("select * from livebarn.medical_record where create_date between '2019-07-17' and '2021-07-24'")
            cursor.execute("""SELECT * from medical_record""")
            
            
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def patch(self):
        print("in health patch", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            data = request.get_json(force=True)
            print(data, file=sys.stderr)
            for k, v in data.items():
                print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
            cursor = cnx.cursor(dictionary=True)
            print("health update++++", file=sys.stderr)
            update_animaldata = ("""UPDATE medical_record SET Animal_id=%(Animal_id)s,
                                                create_date=%(create_date)s,Medicine_ID=%(Medicine_ID)s,
                                                medical_notes=%(medical_notes)s,result=%(result)s,
                                                location=%(location)s, Amt_given=%(Amt_given)s,
                                                route=%(route)s, water_feed =%(water_feed)s,
                                                email_ID=%(email_ID)s,withdraw_time=%(withdraw_time)s
                                                WHERE Record_ID =%(Record_ID)s""")
            update_formulary = ( """UPDATE formulary SET qty_in_stock=qty_in_stock-%(difference)s where drug=%(drug)s and Lot_no=%(Lot_no)s""")
            try:
                cursor.execute(update_animaldata,data)
                cursor.execute(update_formulary, data)
                print("here after execute in update health ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            finally:
                cursor.close()
                cnx.close()

    def delete(self,Record_ID):
        # data = request.get_json(force=True)
        print("delete method++", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("health record delete++++", file=sys.stderr)
            update_animaldata = "DELETE FROM medical_record WHERE Record_ID = %s"
            try:
                cursor.execute(update_animaldata, (Record_ID,))
                print("here after execute in delete health record ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()


class TableHerdUniqueName(Resource):
    def get(self):
        print( "Execution started in herd unique name", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("select distinct name from herds")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def post(self,name):
        print(name)
        print( "Execution started in herd unique name", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("select * from herds where name=%s",(name,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def patch(self):
        data = request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in herd name  from the API call", file=sys.stderr)
            insert_animaldata = ("""UPDATE herds SET string=%(string)s where name=%(name)s""")
            try:
                cursor.execute(insert_animaldata, data)
                print("here after execute", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()


class TableHerd(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("select * from herds")
            #cursor.execute("select distinct name,description,create_date from herd")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def patch(self):
        data = request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        print( "Execution started in herds", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
               print(err, file=sys.stderr)
               return err
        else:
            cursor = cnx.cursor(dictionary=True)
            update_data=("""UPDATE herds SET AID_string=%(AID_string)s, description=%(description)s, name=%(name)s,end_date=%(end_date)s,
                                     create_date=%(create_date)s where name=%(name)s and create_date=%(create_date)s""")
            #cursor.execute(update_data,data)
            try:
                cursor.execute(update_data,data)
                print("here after execute", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("Operational error.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def post(self):
        data = request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in herd from the API call", file=sys.stderr)
            insert_animaldata = ("""INSERT INTO herds (create_date,name,description,AID_string)
                                    VALUES ( %(create_date)s, %(name)s, %(description)s, %(AID_string)s)""")
            try:
                cursor.execute(insert_animaldata, data)
                print("here after execute", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def delete(self):
        data = request.get_json(force=True)
        print("delete method++", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("herd delete++++", file=sys.stderr)
            update_animaldata = "DELETE FROM herds WHERE name = %(name)s and create_date=%(create_date)s"
            try:
                cursor.execute(update_animaldata,data)
                print("here after execute in delete herds ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()


class TableExperiment(Resource):
    def get(self,Animal_ID):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
               return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            # cursor.execute("select * from herd")
            cursor.execute("""select a.animalname,e.animaltype,e.birthweight,e.birthweightadj,e.sireframescore,e.bcsrecent,e.bcsprevious,e.bcsdifference,e.damframescore,e.currentframescore,e.height,e.weight,
                                    e.damwtatwean,e.weanheight,e.weanweight,e.weandate,e.weangpd,e.weanwda,e.weanweightdate,e.adj205w,e.adj205h,e.weanframescore,e.ageatwean,e.herd,e.comments,e.pasture_ID,
                                    e.yearlingweight,e.yearlingheight,e.yearlingdate,e.adjyearlingw,e.adjyearlingh,e.yearlingframescore,e.ageatyearling,e.customweight,
                                    e.customweightdate,e.customheight,e.customheightdate,e.currentwtcow,e.adj365dht,e.currentwtheifer,e.backfat,e.treatment,e.blockpen,
                                    e.replicate,e.email_id,e.Animal_ID,e.expt_date,e.expt_name from animal_table a,experiments e, pasture p where a.Animal_ID=e.Animal_ID and e.Animal_ID=%s and p.pasture_ID=e.pasture_ID order by expt_date desc""",(Animal_ID,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)


    def post(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
           print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in pasture class from the API call")
            insert_animaldata = ("""INSERT INTO experiments (animaltype,birthweight,birthweightadj,sireframescore,bcsrecent,bcsprevious,bcsdifference,
                                    damwtatwean,weanheight,weanweight,weandate,weangpd,weanwda,weanweightdate,adj205w,adj205h,weanframescore,ageatwean,
                                    yearlingweight,yearlingheight,yearlingdate,adjyearlingw,adjyearlingh,yearlingframescore,ageatyearling,customweight,
                                    customweightdate,customheight,customheightdate,currentwtcow,adj365dht,currentwtheifer,backfat,treatment,blockpen,
                                    replicate,email_id,Animal_ID,expt_date,expt_name,height,weight,currentframescore,damframescore,herd,comments,pasture_ID,entry_date)
                                    VALUES( %(animaltype)s,%(birthweight)s,%(birthweightadj)s, %(sireframescore)s, %(bcsrecent)s,%(bcsprevious)s,%(bcsdifference)s,
                                    %(damwtatwean)s, %(weanheight)s,%(weanweight)s ,%(weandate)s,%(weangpd)s,%(weanwda)s,%(weanweightdate)s,%(adj205w)s,%(adj205h)s,%(weanframescore)s,%(ageatwean)s,
                                    %(yearlingweight)s,%(yearlingheight)s,%(yearlingdate)s,%(adjyearlingw)s,%(adjyearlingh)s,%(yearlingframescore)s,%(ageatyearling)s,%(customweight)s,
                                    %(customweightdate)s,%(customheight)s,%(customheightdate)s,%(currentwtcow)s,%(adj365dht)s,%(currentwtheifer)s,%(backfat)s,
                                    %(treatment)s,%(blockpen)s,%(replicate)s,%(email_id)s,%(Animal_ID)s,%(expt_date)s,%(expt_name)s,%(height)s,%(weight)s,%(currentframescore)s,%(damframescore)s,%(herd)s,%(comments)s,%(pasture_ID)s,%(entry_date)s)""")
            try:
                cursor.execute(insert_animaldata, data)
                print("here after insert execute in experiment", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return err
            finally:
                cursor.close()
                cnx.close()

    def patch(self):
        print("in experiment patch", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            data = request.get_json(force=True)
            print(data, file=sys.stderr)
            for k, v in data.iteritems():
                print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
            cursor = cnx.cursor(dictionary=True)
            print("experiment update++++", file=sys.stderr)
            update_animaldata = ("""UPDATE experiments SET animaltype=%(animaltype)s,
                                                birthweight=%(birthweight)s,birthweightadj=%(birthweightadj)s,
                                                sireframescore=%(sireframescore)s,height=%(height)s,weight=%(weight)s,currentframescore=%(currentframescore)s,damframescore=%(damframescore)s,
                                                bcsrecent=%(bcsrecent)s, bcsprevious=%(bcsprevious)s,comments=%(comments)s,herd=%(herd)s,pasture_ID=%(pasture_ID)s,
                                                bcsdifference=%(bcsdifference)s, damwtatwean =%(damwtatwean)s,
                                                email_id=%(email_id)s,weanheight=%(weanheight)s,
                                                weanweight=%(weanweight)s,weandate=%(weandate)s,weangpd=%(weangpd)s,weanwda=%(weanwda)s,
                                                weanweightdate=%(weanweightdate)s,adj205w=%(adj205w)s,adj205h=%(adj205h)s,weanframescore=%(weanframescore)s,
                                                ageatwean=%(ageatwean)s,yearlingweight=%(yearlingweight)s,yearlingheight=%(yearlingheight)s,yearlingdate=%(yearlingdate)s,
                                                adjyearlingw=%(adjyearlingw)s,adjyearlingh=%(adjyearlingh)s,yearlingframescore=%(yearlingframescore)s,ageatyearling=%(ageatyearling)s,
                                                customweight=%(customweight)s,customweightdate=%(customweightdate)s,customheight=%(customheight)s,customheightdate=%(customheightdate)s,
                                                currentwtcow=%(currentwtcow)s,adj365dht=%(adj365dht)s,currentwtheifer=%(currentwtheifer)s,backfat=%(backfat)s,treatment=%(treatment)s,
                                                blockpen=%(blockpen)s,replicate=%(replicate)s,Animal_ID=%(Animal_ID)s,expt_date=%(expt_date)s,expt_name=%(expt_name)s,entry_date=%(entry_date)s
                                                WHERE Animal_ID =%(Animal_ID)s and expt_date=%(expt_date)s""")
            try:
                cursor.execute(update_animaldata,data)
                print("here after execute in update experiment ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            finally:
                cursor.close()
                cnx.close()

    def delete(self):
        data = request.get_json(force=True)
        print("delete method++", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("animal delete++++", file=sys.stderr)
            update_animaldata = "DELETE FROM experiments WHERE expt_ID=%(expt_ID)s"
            try:
                cursor.execute(update_animaldata,data)
                print("here after execute in delete animal_experiment ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

class TableHealthAdd(Resource):
    def get(self, animalname):
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("""SELECT Animal_ID FROM animal_table WHERE animalname = %s""", (animalname,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            print(rows, file=sys.stderr)
            cursor.close()
            cnx.close()
            return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.items():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in health add class from the API call", file=sys.stderr)
            insert_animaldata = ("""INSERT INTO medical_record (result,Animal_id,create_date,medical_notes,location,Amt_given,route,water_feed,
                                    withdraw_time,email_id,Medicine_ID)  VALUES( %(result)s,%(Animal_id)s,%(create_date)s,%(medical_notes)s,
                                    %(location)s, %(Amt_given)s,%(route)s,%(water_feed)s,%(withdraw_time)s,%(email_id)s,%(Medicine_ID)s )""")
            update_formulary=("""UPDATE formulary SET qty_in_stock=qty_in_stock-%(Amt_given)s where drug=%(drug)s and Lot_no=%(Lot_no)s""")
            try:
                cursor.execute(insert_animaldata, data)
                cursor.execute(update_formulary, data)
                print("here after execute in health add", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def patch(self,Animal_id):
        print( "Execution started in Repro", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("""SELECT a.animalname,ID,r.Animal_id, breeding, pregnancy, calfdob,damageatbirth,
                                    siblingcode, calfatside, totalcalves, previouscalf, currentcalf,calfbirthweight,
                                    calfsex, r.email_id, pasturenumber, damcalvingdisposition, calvingease,udderscore,
                                    conditionscorecalving,hiphtweaning,hiphtbreeding,damdisposition,cowframescore,cowwtbreeding,
                                    cowhtbreeding,cowwtweaning,cowhtweaning,cowwtcalving,cowhtcalving,bcsweaning,bcscalving,bcsbreeding,
                                    customcowwt,customcowht,bulldisposition,bullframescore,bullwtprebreeding,bullhtprebreeding,
                                    fertility,mobility,conc,deadabnormal,date from reproduction r,animal_table a where a.Animal_ID=r.Animal_id and r.Animal_id=%s""",Animal_id)
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

class TableReproduction(Resource):
    def get(self):
        print( "Execution started in Repro", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("""SELECT a.animalname,ID,r.Animal_id, breeding, pregnancy, calfdob,damageatbirth,
                                    siblingcode, calfatside, totalcalves, previouscalf, currentcalf,calfbirthweight,
                                    calfsex, r.email_id, pasturenumber, damcalvingdisposition, calvingease,udderscore,
                                    conditionscorecalving,hiphtweaning,hiphtbreeding,damdisposition,cowframescore,cowwtbreeding,
                                    cowhtbreeding,cowwtweaning,cowhtweaning,cowwtcalving,cowhtcalving,bcsweaning,bcscalving,bcsbreeding,
                                    customcowwt,customcowht,bulldisposition,bullframescore,bullwtprebreeding,bullhtprebreeding,
                                    fertility,mobility,conc,deadabnormal,date from reproduction r,animal_table a where a.Animal_ID=r.Animal_id""")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in repro class from the API call", file=sys.stderr)
            #insert_animaldata= """INSERT INTO animal_table (animalname,DOB,email_id) VALUES (%(animalname)s,%(calfdob)s,%(email_id)s) """
            insert_animaldata = ("""INSERT INTO animal_table(animalname, animaltype, eartag, eid, pasture_ID, weight,
                                     height, gender, sex, breed, status, current_expt_no, Herd, breeder, currentframescore,
                                     damframescore, comments, species, email_id, brand, brandlocation, tattooleft, tattooright,
                                     alternativeid, registration, color, hornstatus, dam, sire, DOB, howacquired, dateacquired,
                                     howdisposed, datedisposed, disposalreason, herdnumberlocation, herdstatus,
                                     howconceived, managementcode, ownerID, springfall, includeinlookups,sub_pasture)
                                     VALUES( %(animalname)s, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',%(email_id)s, '0', '0', '0',
                                     '0', '0', '0', '0', '0', '0', '0',%(calfdob)s, '0', '1960-01-01', '0','1960-01-01', '0', '0', '0', '0', '0', '0', '0', '0','0')""")



            try:
                cursor.execute(insert_animaldata, data)
                #cnx.commit()
                print("committed", file=sys.stderr)
                cursor = cnx.cursor(dictionary=True)
                select_animal = """select distinct Animal_ID,animalname,DOB from animal_table where animalname=%(animalname)s"""
                cursor.execute(select_animal, data)
                print("after select stmt", file=sys.stderr)
                rows = cursor.fetchall()
                for row in rows:
                    print("* {Animal_ID}".format(Animal_ID=row['Animal_ID']), file=sys.stderr)
                # for k, v in rows.iteritems():
                #     if k=="Animal_id":
                #         print("inside if")
                #         res=v
                #res=1120
                Animal_ID=rows[0]['Animal_ID']
                print(Animal_ID, file=sys.stderr)
                data['Animal_ID'] = Animal_ID
                insert_reproductiondata = ("""INSERT INTO reproduction (Animal_id , breeding, pregnancy, calfdob,damageatbirth,
                                                    siblingcode, calfatside, totalcalves, previouscalf, currentcalf,calfbirthweight,
                                                    calfsex, damcalvingdisposition, calvingease,udderscore, email_id,
                                                    conditionscorecalving,hiphtweaning,hiphtbreeding,damdisposition,cowframescore,cowwtbreeding,
                                                    cowhtbreeding,cowwtweaning,cowhtweaning,cowwtcalving,cowhtcalving,bcsweaning,bcscalving,bcsbreeding,
                                                    customcowwt,customcowht,bulldisposition,bullframescore,bullwtprebreeding,bullhtprebreeding,
                                                    fertility,mobility,conc,deadabnormal,date,entry_date)
                                                    VALUES( %(Animal_ID)s,%(breeding)s,%(pregnancy)s, %(calfdob)s,%(damageatbirth)s,%(siblingcode)s,
                                                    %(calfatside)s, %(totalcalves)s,%(previouscalf)s,%(currentcalf)s,%(calfbirthweight)s,%(calfsex)s,%(damcalvingdisposition)s,
                                                    %(calvingease)s, %(udderscore)s,%(email_id)s,%(conditionscorecalving)s,%(hiphtweaning)s,%(hiphtbreeding)s,
                                                    %(damdisposition)s,%(cowframescore)s,%(cowwtbreeding)s,%(cowhtbreeding)s,%(cowwtweaning)s,%(cowhtweaning)s,%(cowwtcalving)s,
                                                    %(cowhtcalving)s,%(bcsweaning)s,%(bcscalving)s,%(bcsbreeding)s,%(customcowwt)s,%(customcowht)s,%(bulldisposition)s,%(bullframescore)s,
                                                    %(bullwtprebreeding)s,%(bullhtprebreeding)s,%(fertility)s,%(mobility)s,%(conc)s,%(deadabnormal)s,%(date)s,%(entry_date)s)""")
                cursor.execute(insert_reproductiondata,data)
                print("here after execute in repro", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError as e:
                print(e, file=sys.stderr)
                #raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def patch(self):
        print("in repro patch", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            data = request.get_json(force=True)
            print(data, file=sys.stderr)
            for k, v in data.iteritems():
                print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
            cursor = cnx.cursor(dictionary=True)
            print("repro update++++", file=sys.stderr)
            update_animaldata = ("""UPDATE reproduction SET pregnancy=%(pregnancy)s,calfdob=%(calfdob)s,conc=%(conc)s,
                                                damageatbirth=%(damageatbirth)s,siblingcode=%(siblingcode)s,calfatside=%(calfatside)s,totalcalves=%(totalcalves)s,
                                                previouscalf=%(previouscalf)s,currentcalf=%(currentcalf)s,calfbirthweight=%(calfbirthweight)s,
                                                calfsex=%(calfsex)s, damcalvingdisposition=%(damcalvingdisposition)s,calvingease=%(calvingease)s,
                                                udderscore=%(udderscore)s, conditionscorecalving =%(conditionscorecalving)s,hiphtweaning=%(hiphtweaning)s,
                                                email_id=%(email_id)s,pasturenumber=%(pasturenumber)s,hiphtbreeding=%(hiphtbreeding)s,damdisposition=%(damdisposition)s,
                                                cowframescore=%(cowframescore)s,cowwtbreeding=%(cowwtbreeding)s,cowhtbreeding=%(cowhtbreeding)s,cowwtweaning=%(cowwtweaning)s,cowhtweaning=%(cowhtweaning)s,
                                                cowwtcalving=%(cowwtcalving)s,cowhtcalving=%(cowhtcalving)s,bcsweaning=%(bcsweaning)s,bcscalving=%(bcscalving)s,bcsbreeding=%(bcsbreeding)s,
                                                customcowwt=%(customcowwt)s,customcowht=%(customcowht)s,bulldisposition=%(bulldisposition)s,bullframescore=%(bullframescore)s,bullwtprebreeding=%(bullwtprebreeding)s,
                                                bullhtprebreeding=%(bullhtprebreeding)s,fertility=%(fertility)s,mobility=%(mobility)s,deadabnormal=%(deadabnormal)s,date=%(date)s
                                                WHERE ID =%(ID)s """)
            try:
                cursor.execute(update_animaldata,data)
                print("here after execute in update repro ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            finally:
                cursor.close()
                cnx.close()

    def delete(self,ID):
        # data = request.get_json(force=True)
        print("delete method++", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("repro delete++++", file=sys.stderr)
            update_animaldata = "DELETE FROM reproduction WHERE ID = %s "
            try:
                cursor.execute(update_animaldata, (ID,))
                print("here after execute in delete repro ", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError:
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()
class Expt(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            # cursor.execute("select * from herd")
            cursor.execute("""select e.expt_ID,a.animalname,e.animaltype,e.birthweight,e.birthweightadj,e.sireframescore,e.bcsrecent,e.bcsprevious,e.bcsdifference,e.damframescore,e.currentframescore,e.height,e.weight,e.herd,e.comments,
                                    e.damwtatwean,e.weanheight,e.weanweight,e.weandate,e.weangpd,e.weanwda,e.weanweightdate,e.adj205w,e.adj205h,e.weanframescore,e.ageatwean,p.pasturenumber,
                                    e.yearlingweight,e.yearlingheight,e.yearlingdate,e.adjyearlingw,e.adjyearlingh,e.yearlingframescore,e.ageatyearling,e.customweight,
                                    e.customweightdate,e.customheight,e.customheightdate,e.currentwtcow,e.adj365dht,e.currentwtheifer,e.backfat,e.treatment,e.blockpen,
                                    e.replicate,e.email_id,e.Animal_ID,e.expt_date,e.expt_name from animal_table a,experiments e ,pasture p where a.Animal_ID=e.Animal_ID and e.pasture_ID=p.pasture_ID order by expt_date desc""")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

            return jsonify(rows)

    def post(self,Animal_ID,expt_date):
        print( "Execution started", file=sys.stderr)
        try:
           cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
               return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            # cursor.execute("select * from herd")
            cursor.execute("""select * from experiments WHERE Animal_ID =%s and expt_date=%s""",(Animal_ID,expt_date,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()
            cnx.close()
            return jsonify(rows)

class TableInspection(Resource):
    def get(self):
        print( "Execution started in inspection", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
                return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            # cursor.execute("select * from herd")
            cursor.execute("""select report_ID,p.pasturenumber,i.pasture_ID,general_appearance,live_stock,date,animal_condition,fencing,access_to_food,access_to_water,
                                    cleaniness_of_water,i.email_ID,access_to_shelter,comments,pasture_major_deficiencies,pasture_minor_deficiencies,builinding_number,lighting,housekeeping,
                                    head_catch_condition,non_slip_surface_evidence,Pen_condition,container_disposal,drug_storage,sub_pasture,cow_count,calf_count,bull_count from inspection_report i,pasture p where i.pasture_ID=p.pasture_ID""")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

            return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in inspection add class from the API call", file=sys.stderr)
            insert_animaldata = ("""INSERT INTO inspection_report (pasture_ID,general_appearance,live_stock,date,animal_condition,fencing,access_to_food,access_to_water,
                                    cleaniness_of_water,email_ID,access_to_shelter,comments,pasture_major_deficiencies,pasture_minor_deficiencies,builinding_number,lighting,housekeeping,
                                    head_catch_condition,non_slip_surface_evidence,Pen_condition,container_disposal,drug_storage,sub_pasture,cow_count,calf_count,bull_count)
                                     VALUES( %(pasture_ID)s,%(general_appearance)s,%(live_stock)s,%(date)s, %(animal_condition)s, %(fencing)s,%(access_to_food)s,%(access_to_water)s,
                                     %(cleaniness_of_water)s,%(email_ID)s,%(access_to_shelter)s,%(comments)s,%(pasture_major_deficiencies)s,%(pasture_minor_deficiencies)s,%(builinding_number)s,%(lighting)s,
                                      %(housekeeping)s,%(head_catch_condition)s,%(non_slip_surface_evidence)s,%(Pen_condition)s,%(container_disposal)s,%(drug_storage)s,%(sub_pasture)s,%(cow_count)s,%(calf_count)s,%(bull_count)s)""")

            try:
                cursor.execute(insert_animaldata, data)
                print("here after execute in inspection add", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError as e:
                print(e, file=sys.stderr)
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

    def patch(self):
        data=request.get_json(force=True)
        print(data, file=sys.stderr)
        for k, v in data.iteritems():
            print( ("Code : {0} ==> Value : {1}".format(k, v)), file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            print("here in inspection patch method from the API call", file=sys.stderr)
            insert_animaldata = ("""Update inspection_report set pasture_ID=%(pasture_ID)s,general_appearance=%(general_appearance)s,live_stock=%(live_stock)s,date=%(date)s,animal_condition=%(animal_condition)s,fencing=%(fencing)s,access_to_food=%(access_to_food)s,access_to_water=%(access_to_water)s,
                                    cleaniness_of_water=%(cleaniness_of_water)s,email_ID=%(email_ID)s,access_to_shelter=%(access_to_shelter)s,comments=%(comments)s,pasture_major_deficiencies=%(pasture_major_deficiencies)s,pasture_minor_deficiencies=%(pasture_minor_deficiencies)s,builinding_number=%(builinding_number)s,lighting=%(lighting)s,housekeeping=%(housekeeping)s,
                                    head_catch_condition=%(head_catch_condition)s,non_slip_surface_evidence=%(non_slip_surface_evidence)s,Pen_condition=%(Pen_condition)s,container_disposal=%(container_disposal)s,drug_storage=%(drug_storage)s,sub_pasture=%(sub_pasture)s,cow_count=%(cow_count)s,calf_count=%(calf_count)s,bull_count=%(bull_count)s
                                    where report_ID=%(report_ID)s""")

            try:
                cursor.execute(insert_animaldata, data)
                print("here after execute in inspection add", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError as e:
                print(e, file=sys.stderr)
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()

class Drug(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("SELECT distinct drug from formulary order by drug")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()
        return jsonify(rows)

    def patch(self,drug):
        #data=request.get_json(force=True)
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            drug_data=("SELECT  Lot_no,Medicine_ID from formulary where drug=%s")
            cursor.execute(drug_data,(drug,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()
        return jsonify(rows)

class Report(Resource):
    def get(self, Animal_ID,start_date,end_date):
        print( "Execution started--report table", file=sys.stderr)
        try:
           cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("""SELECT * FROM animal_table AS p1 INNER JOIN experiments AS p2 ON p1.Animal_ID = p2.Animal_ID INNER JOIN reproduction AS p3 ON p1.Animal_ID = p3.Animal_ID and p1.Animal_ID=%s and p2.expt_date between %s and %s """, (Animal_ID,start_date,end_date))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()
        return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print( "Execution started in report table", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            insert_data = ("""INSERT INTO report (name,parameters,start_date,end_date)VALUES(%(name)s,%(parameters)s,%(start_date)s,%(end_date)s)""")
            print("here  report add", file=sys.stderr)

            try:
                cursor.execute( insert_data,data)
                ID = cursor.lastrowid
                print("here after execute in report add", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError as e:
                print(e, file=sys.stderr)
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()
                return ID

class ReportAll(Resource):
    def get(self,ID):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
               return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            cursor.execute("""select * from report where ID=%s""",(ID,))
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def post(self):
        print( "Execution started--report table", file=sys.stderr)
        try:
           cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            data=("select * from report")
            cursor.execute(data)
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()
        return jsonify(rows)

class Event(Resource):
    def get(self):
        #print( "Execution started in get event", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
               return err
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
                return err
            else:
                print(err, file=sys.stderr)
                return err
        else:
            cursor = cnx.cursor(dictionary=True)
            now = datetime.datetime.now()
            cursor.execute("""select * from event where YEAR(eventdate) = YEAR(CURRENT_DATE()) AND
      MONTH(eventdate) = MONTH(CURRENT_DATE())""")
            rows = cursor.fetchall()
            print("Fetch Completed", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

    def post(self):
        data=request.get_json(force=True)
        print( "Execution started in post event class", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            insert_data = ("""INSERT INTO event (event,eventdate)VALUES(%(event)s,%(eventdate)s)""")

            try:
                cursor.execute( insert_data,data)
                print("here after execute in inspection add", file=sys.stderr)
                cnx.commit()
                return "Success", 201
            except AttributeError as e:
                print(e, file=sys.stderr)
                raise errors.OperationalError("MySQL Connection not available.")
            except mysql.connector.IntegrityError as err:
                print("Error: {}".format(err), file=sys.stderr)
                return None
            finally:
                cursor.close()
                cnx.close()
          
class cow_2014_list(Resource):
     def get(self):
         try:
             cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
         except mysql.connector.Error as err:
             if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                 print("Something is wrong with your user name or password", file=sys.stderr)
             elif err.errno == errorcode.ER_BAD_DB_ERROR:
                 print("Database does not exist", file=sys.stderr)
             else:
                 print(err)
         else:
             cursor = cnx.cursor(dictionary=True)
             cursor.execute("""SELECT * FROM cow_2014""")
             rows = cursor.fetchall()
             print("Fetch Completed", file=sys.stderr)
             #print(rows)
             cursor.close()
             cnx.close()
             return jsonify(rows)
class Demo(Resource):
     def get(self):
         try:
             cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
         except mysql.connector.Error as err:
             if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                 print("Something is wrong with your user name or password", file=sys.stderr)
             elif err.errno == errorcode.ER_BAD_DB_ERROR:
                 print("Database does not exist", file=sys.stderr)
             else:
                 print(err)
         else:
             cursor = cnx.cursor(dictionary=True)
             cursor.execute("""SELECT * FROM Demo""")
             rows = cursor.fetchall()
             print("Fetch Completed", file=sys.stderr)
             #print(rows)
             cursor.close()
             cnx.close()
             return jsonify(rows)



class DemoUploadInsert(Resource):
     def post(self,EID,date_registered,weight,type,date_scanned):
         print("In method")
         #return "hello";
         try:
             cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
         except mysql.connector.Error as err:
             if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                 print("Something is wrong with your user name or password", file=sys.stderr)
             elif err.errno == errorcode.ER_BAD_DB_ERROR:
                 print("Database does not exist", file=sys.stderr)
             else:
                 print(err)
         else:
             cursor = cnx.cursor(dictionary=True)
             print("connection created")
             cursor.execute("""insert into demo values(%s,%s,%s,%s,%s) """,(EID,date_registered,weight,type,date_scanned))
             cnx.commit()
         return "Success", 201;    

    
class DemoDataInBetweenDates(Resource):
    def get(self,start_date,end_date):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)
            #cursor.execute("SELECT result,Record_ID,Animal_id,create_date,email_id,medical_notes,location,Amt_given,route,water_feed,"
              #            "withdraw_time,(select drug from formulary where medical_record.Medicine_ID=formulary.Medicine_ID)drug "
              #           "from medical_record;")
            #cursor.execute("select * from livebarn.medical_record where create_date between '2018-07-16' and '2020-05-19'")
            #cursor.execute("select * from livebarn.medical_record where create_date between '2018-07-17' and '2018-07-24'")
            #cursor.execute("select * from livebarn.medical_record where create_date between '1959-07-17' and '1961-07-24'")
            #cursor.execute("select * from livebarn.medical_record where create_date between '2019-07-17' and '2021-07-24'")
            
            #query = """SELECT EID, Date(Registered), Weight(lbs), Type, Date_scanned FROM USDA.Demo WHERE Date(Registered).Date >= @start_date  AND Date(Registered).Date < @end_date;"""
            #cursor2.execute("set @start_date = '2016-07-18';")

            #cursor2.execute("set @end_date = '2016-07-21';")

            #cursor2.execute(query)
            
            
            cursor.execute("""SELECT * from USDA.Demo where Date_Registered  between %s and %s""",(start_date,end_date))
            
           # cursor.execute("""SELECT * from USDA.Demo where Date < '2016-07-18' and Date >= '2016-07-21'  """)
            rows = cursor.fetchall()
            print("Fetch Completed and rows retrieved are:  ", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

class StandardQuery1(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)

            cursor.execute("""SELECT * from animal_table WHERE weight >= 1200 """)    
           
            rows = cursor.fetchall()
            print("Fetch Completed and rows retrieved are:  ", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

class StandardQuery3(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)

            cursor.execute("""SELECT * from animal_table WHERE hornstatus = "polled" and sire = "RD Angus" """)    
           
            rows = cursor.fetchall()
            print("Fetch Completed and rows retrieved are:  ", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

class StandardQuery2(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)

            cursor.execute("""SELECT * from animal_table WHERE breed = "X-Bred" and howdisposed = "Sold" """)    
           
            rows = cursor.fetchall()
            print("Fetch Completed and rows retrieved are:  ", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)

class ViewTables(Resource):
    def get(self):
        print( "Execution started", file=sys.stderr)
        try:
            cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")

        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Something is wrong with your user name or password", file=sys.stderr)
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist", file=sys.stderr)
            else:
                print(err, file=sys.stderr)
        else:
            cursor = cnx.cursor(dictionary=True)

            cursor.execute("""SELECT table_name FROM information_schema.tables WHERE table_schema='USDA' """)    
           
            rows = cursor.fetchall()
            # print(rows)
            print("Fetch Completed and rows retrieved are:  ", file=sys.stderr)
            cursor.close()

            cnx.close()

        return jsonify(rows)
   
   
class DeleteTables(Resource):
    def delete(self,nameOfTable):
        print("method reached"+nameOfTable)
        try:
             cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
        except mysql.connector.Error as err:
             if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                 print("Something is wrong with your user name or password", file=sys.stderr)
             elif err.errno == errorcode.ER_BAD_DB_ERROR:
                 print("Database does not exist", file=sys.stderr)
             else:
                 print(err)
        else:
             cursor = cnx.cursor(dictionary=True)             
            #  print("connected to database")
             deleteQuery="drop table "+nameOfTable;
             cursor.execute(deleteQuery);
             cnx.close()

class search(Resource):
     def get(self,start_date,end_date):
         try:
             cnx = mysql.connector.connect(host="localhost", user="root", passwd="abc123", db="USDA")
         except mysql.connector.Error as err:
             if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                 print("Something is wrong with your user name or password", file=sys.stderr)
             elif err.errno == errorcode.ER_BAD_DB_ERROR:
                 print("Database does not exist", file=sys.stderr)
             else:
                 print(err)
         else:
             cursor = cnx.cursor(dictionary=True)
             cursor.execute("""SELECT * from medical_record where create_date between %s and %s""",(start_date,end_date))
             rows = cursor.fetchall()
             print("Fetch Complemted", file=sys.stderr)
             print(rows)
             cursor.close()
             cnx.close()
             return jsonify(rows)
