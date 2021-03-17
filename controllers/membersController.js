import Member from "../models/members.model.js";


//Add a Member
export async function addMember(req, res) {
    try {
        let member = await Member.create(req.body);
        if (member) {
            res.status(200).json({
                success: true,
                message: 'Member created successfully',
                data: member
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Member could not be created, bad request'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View a member
export async function viewMember(req, res) {
    try {
        let member = await Member.findOne({where: {member_id: req.params.id}});
        if (member) {
            res.json({
                success: true,
                message: 'Member record retrieved successfully',
                data: member
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Member not found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//View all members
export async function viewAllMembers(req, res) {
    try {
        let allmembers = await Member.findAll();
        if (allmembers) {
            res.json({
                success: true,
                message: 'Member records retrieved successfully',
                data: allmembers
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No Member records found.',
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }
}

//Update member record
export async function updateMember(req, res) {
    try{
        const member = await Member.findOne({where: {member_id: req.params.id}});
        if (member){
            if (req.body.member_name && req.body.member_name !== member.member_name){member.member_name = req.body.member_name;}
            if (req.body.member_gender && req.body.member_gender !== member.member_gender){member.member_gender = req.body.member_gender;}
            if (req.body.email_address && req.body.email_address !== member.email_address){member.email_address = req.body.email_address;}
            if (req.body.telephone_number && req.body.telephone_number !== member.telephone_number){member.telephone_number = req.body.telephone_number;}
            if (req.body.date_of_birth && req.body.date_of_birth !== member.date_of_birth){member.date_of_birth = req.body.date_of_birth;}
            if (req.body.address && req.body.address !== member.address){member.address = req.body.address;}
            if (req.body.referral_id && req.body.referral_id !== member.referral_id){member.referral_id = req.body.referral_id;}
            
            await member.save();
            await member.reload();

            res.status(200).json({
                success: true,
                message: 'Member updated successfully',
                data: member
            })
        }else{
            res.status(404).json({
                success: true,
                message: 'Member not found',
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        }) 
    }
}

//Delete a member
export async function deleteMember(req, res) {
    try{
        const member = await Member.findOne({where: {member_id: req.params.id}});

        if (member){
            await member.destroy();
            res.status(200).json({
                success: true,
                message: "Member deleted successfully"
            })
        }else{
            res.status(404).json({
                success: false,
                message: "Member not found"
            })
        }
    }catch (err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something is wrong"
        })
    }
}
