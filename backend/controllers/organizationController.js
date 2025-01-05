const Organization = require('../models/Organization');

// Get all organizations
const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new organization
const createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an organization
const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an organization
const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }
    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
