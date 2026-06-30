import Department from '../models/Department.js'

// Get All Departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({ success: true, departments })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get departments server error" })
    }
}

// Add Department
const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body
        const newDep = new Department({ dep_name, description })
        await newDep.save()
        return res.status(200).json({ success: true, department: newDep })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Add department server error" })
    }
}

// Get Single Department By ID
const getDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const department = await Department.findById(id)
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" })
        }
        return res.status(200).json({ success: true, department })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Get department server error" })
    }
}

// Update Department
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const { dep_name, description } = req.body

        const updatedDep = await Department.findByIdAndUpdate(
            id,
            { dep_name, description },
            { new: true }
        )

        if (!updatedDep) {
            return res.status(404).json({ success: false, error: "Department not found" })
        }

        return res.status(200).json({ success: true, department: updatedDep })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: "Update department server error" })
    }
}

// Delete Department
// Fixed: try/catch was floating outside the function body; wrong args to findByIdAndDelete;
//        was checking !updateDep instead of !deletedDep
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params

        const deletedDep = await Department.findById(id)  
        // no extra args needed
        await deletedDep.deleteOne()

        if (!deletedDep) {
            return res.status(404).json({ success: false, error: "Department not found" })
        }

        return res.status(200).json({ success: true, department: deletedDep })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: "Delete department server error" })
    }
}

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment }